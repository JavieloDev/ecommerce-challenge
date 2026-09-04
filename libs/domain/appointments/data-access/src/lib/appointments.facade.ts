import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APPOINTMENT_STATUS_LABEL, AppointmentStatus } from '@ecommerce-challenge-v1/appointments-model';
import { finalize } from 'rxjs';
import { Appointment } from './mock/boosti-appointments-mock';
import { AppointmentsService } from './services/appointment.service';

/**
 * NOTE: View-state of the appointments load machine, not an Appointment field.
 * Colocated with the facade (data-access). If several domains shared it,
 * move to libs/shared as AsyncStatus — not to model/.
 */
export type ScreenState = 'loading' | 'success' | 'error';

export type ToastState = {
  type: 'success' | 'error' | 'info';
  text: string;
};

/**
 * Domain API for the appointments feature.
 * The page talks to this class, not to AppointmentsService.
 * Keeps RxJS at the boundary and exposes signals to the UI.
 */
@Injectable({ providedIn: 'root' })
export class AppointmentsFacade {
  private readonly api = inject(AppointmentsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly screen = signal<ScreenState>('loading');
  readonly errorMessage = signal('');
  readonly appointments = signal<Appointment[]>([]);
  readonly updatingIds = signal(new Set<string>());
  readonly toast = signal<ToastState | null>(null);

  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.toastTimer));
  }

  /** Loads the list. Sets loading, then success or error. */
  load(): void {
    this.screen.set('loading');
    this.errorMessage.set('');
    this.toast.set(null);

    this.api
      .getAppointments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items) => {
          this.appointments.set(items);
          this.screen.set('success');
        },
        error: (error: unknown) => {
          this.screen.set('error');
          this.errorMessage.set(
            error instanceof Error
              ? error.message
              : 'Error al cargar appointments',
          );
        },
      });
  }

  /**
   * Optimistic status update for one appointment.
   * Ignores a second request for the same id while it is in flight.
   * Rolls back if the API errors; always clears the busy flag in finalize.
   */
  updateStatus(id: string, status: AppointmentStatus): void {
    if (this.updatingIds().has(id)) return;

    const previous = this.appointments().find((item) => item.id === id);
    if (!previous || previous.status === status) return;

    this.updatingIds.update((current) => new Set(current).add(id));
    this.appointments.update((list) =>
      list.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    this.showToast('info', 'Saving status…');

    this.api
      .updateAppointmentStatus(id, status)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.updatingIds.update((current) => {
            const next = new Set(current);
            next.delete(id);
            return next;
          });
        }),
      )
      .subscribe({
        next: (updated) => {
          this.appointments.update((list) =>
            list.map((item) => (item.id === updated.id ? updated : item)),
          );
          this.showToast(
            'success',
            `${previous.client.fullName}: ${APPOINTMENT_STATUS_LABEL[updated.status]}.`,
          );
        },
        error: (error: unknown) => {
          this.appointments.update((list) =>
            list.map((item) => (item.id === id ? previous : item)),
          );
          this.showToast(
            'error',
            error instanceof Error ? error.message : 'Could not update status.',
          );
        },
      });
  }

  /** Evaluator hook: fail the next API call, then reload. */
  simulateError(): void {
    this.api.failNextRequest();
    this.load();
  }

  /** Sets the toast. Success/info auto-hide; errors stay until the next load or toast. */
  private showToast(type: ToastState['type'], text: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set({ type, text });
    if (type !== 'error') {
      this.toastTimer = setTimeout(() => this.toast.set(null), 3500);
    }
  }
}
