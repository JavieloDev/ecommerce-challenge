import { Component, input } from '@angular/core';
import { APPOINTMENT_STATUS_LABEL, AppointmentStatus } from '@ecommerce-challenge-v1/appointments-model';

/**
 * StatusBadgeComponent
 *
 * PURPOSE:
 * Displays a color-coded status badge for appointment statuses.
 * Provides visual feedback with semantic colors and human-readable labels.
 *
 * USAGE:
 * ```html
 * <!-- Basic usage -->
 * <lib-status-badge [status]="appointment.status" />
 *
 * <!-- With a specific status -->
 * <lib-status-badge [status]="'confirmed'" />
 * <lib-status-badge [status]="'completed'" />
 * <lib-status-badge [status]="'cancelled'" />
 * ```
 *
 * EXAMPLE IN CONTEXT:
 * ```html
 * <!-- In an appointment list -->
 * <div class="flex items-center justify-between">
 *   <span>{{ appointment.client.fullName }}</span>
 *   <lib-status-badge [status]="appointment.status" />
 * </div>
 *
 * <!-- In a table column -->
 * <td>
 *   <lib-status-badge [status]="appointment.status" />
 * </td>
 * ```
 */
@Component({
  selector: 'lib-status-badge',
  imports: [],
  template: `
    <span
      class="inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium sm:px-2.5 sm:text-xs"
      [class]="toneClass()"
    >
      {{ label() }}
    </span>
  `,
})
export class StatusBadgeComponent {
  /**
   * The appointment status to display.
   * Determines both the label text and the badge color.
   */
  readonly status = input.required<AppointmentStatus>();

  /**
   * Returns the human-readable label for the current status.
   * Uses the APPOINTMENT_STATUS_LABEL mapping constant.
   *
   * @returns {string} The display label for the status
   */
  readonly label = () => APPOINTMENT_STATUS_LABEL[this.status()];

  /**
   * Returns the Tailwind CSS color classes based on the status.
   *
   * Color mapping:
   * - confirmed, checked_in  → sky blue (bg-sky-100 / text-sky-800)
   * - in_progress            → violet (bg-violet-100 / text-violet-800)
   * - completed              → emerald green (bg-emerald-100 / text-emerald-800)
   * - cancelled, no_show     → rose red (bg-rose-100 / text-rose-800)
   * - default (unknown)      → slate gray (bg-slate-100 / text-slate-700)
   *
   * @returns {string} Tailwind CSS class string for styling
   */
  readonly toneClass = () => {
    switch (this.status()) {
      case 'confirmed':
      case 'checked_in':
        return 'bg-sky-100 text-sky-800';
      case 'in_progress':
        return 'bg-violet-100 text-violet-800';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'cancelled':
      case 'no_show':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };
}
