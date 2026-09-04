import { Component, input, output } from '@angular/core';
import { Appointment } from '@ecommerce-challenge-v1/appointments-data-access';
import {
  APPOINTMENT_STATUS_LABEL,
  APPOINTMENT_STATUSES,
  AppointmentStatus,
} from '@ecommerce-challenge-v1/appointments-model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'lib-appointments-list',
  imports: [DatePipe, StatusBadgeComponent, CurrencyPipe],
  templateUrl: './appointments-list.component.html',
})
export class AppointmentListComponent {
  /**
   * Required input: List of appointments to display in the list.
   */
  readonly appointments = input.required<Appointment[]>();

  /**
   * Optional input: Set of appointment IDs that are currently being updated.
   * Used to disable status controls for those appointments.
   * Defaults to an empty Set.
   */
  readonly updatingIds = input(new Set<string>());

  /**
   * Output: Emits when a user changes an appointment's status.
   * Emits an object with the appointment ID and the new status.
   */
  readonly statusChange = output<{ id: string; status: AppointmentStatus }>();

  /**
   * Exposed constants for use in the template:
   * - statuses: All available appointment statuses
   * - labels: Human-readable labels for each status
   */
  readonly statuses = APPOINTMENT_STATUSES;
  readonly labels = APPOINTMENT_STATUS_LABEL;

  /**
   * Handles status change events from the dropdown select.
   * Only emits if the selected status is different from the current one.
   *
   * @param appointment - The appointment being updated
   * @param event - The DOM event from the select element
   */
  onStatusChange(appointment: Appointment, event: Event): void {
    const status = (event.target as HTMLSelectElement)
      .value as AppointmentStatus;
    if (status === appointment.status) return;
    this.statusChange.emit({ id: appointment.id, status });
  }
}
