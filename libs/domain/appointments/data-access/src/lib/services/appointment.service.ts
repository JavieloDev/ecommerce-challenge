import { Injectable } from '@angular/core';
import { mergeMap, Observable, of, throwError, timer } from 'rxjs';
import { AppointmentStatus } from '@ecommerce-challenge-v1/appointments-model';
import { Appointment, MOCK_APPOINTMENTS } from '../mock/boosti-appointments-mock';

/**
 * In-memory appointments API. The page depends on this class, not on MOCK_APPOINTMENTS.
 * Swap the implementation for HttpClient later without changing feature/ui.
 */
@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  /** Working copy so reset() can restore the original seed data. */
  private appointments: Appointment[] = structuredClone(MOCK_APPOINTMENTS);
  private shouldFailNextRequest = false;

  /** Evaluator hook: the next get/update fails once, then the flag clears. */
  failNextRequest(): void {
    this.shouldFailNextRequest = true;
  }

  /** Returns a clone of the in-memory list so callers cannot mutate service state. */
  getAppointments(): Observable<Appointment[]> {
    return this.respond(() => structuredClone(this.appointments));
  }

  /**
   * Finds by id, replaces status without mutating the stored object, returns a clone.
   * Errors if the id is missing — `respond()` turns that throw into throwError.
   */
  updateAppointmentStatus(
    appointmentId: string,
    status: AppointmentStatus,
  ): Observable<Appointment> {
    return this.respond(() => {
      const current = this.appointments.find(
        (item) => item.id === appointmentId,
      );

      if (!current) {
        throw new Error(`Appointment ${appointmentId} was not found.`);
      }

      const updated: Appointment = { ...current, status };
      this.appointments = this.appointments.map((item) =>
        item.id === appointmentId ? updated : item,
      );

      return structuredClone(updated);
    });
  }

  /** Restores seed data and clears a pending failNextRequest. */
  reset(): void {
    this.appointments = structuredClone(MOCK_APPOINTMENTS);
    this.shouldFailNextRequest = false;
  }

  /**
   * Shared async boundary: ~700ms latency, optional one-shot failure, clone-on-emit.
   * get and update both go through here so the UI can treat them as one API.
   */
  private respond<T>(factory: () => T, latencyMs = 700): Observable<T> {
    return timer(latencyMs).pipe(
      mergeMap(() => {
        if (this.shouldFailNextRequest) {
          this.shouldFailNextRequest = false;
          return throwError(
            () => new Error('The simulated appointments API failed.'),
          );
        }

        try {
          return of(factory());
        } catch (error: unknown) {
          return throwError(() => error);
        }
      }),
    );
  }
}
