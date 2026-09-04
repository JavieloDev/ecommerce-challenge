import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AppointmentLocation } from '@ecommerce-challenge-v1/appointments-data-access';
import { APPOINTMENT_STATUS_LABEL, APPOINTMENT_STATUSES } from '@ecommerce-challenge-v1/appointments-model';

/**
 * AppointmentFiltersComponent
 *
 * PURPOSE:
 * Provides filter controls for the appointments list.
 * Allows users to filter appointments by location and status.
 *
 * USAGE:
 * ```html
 * <lib-appointments-filters
 *   [locations]="locations"
 *   [locationId]="locationId()"
 *   [status]="statusFilter()"
 *   (locationChange)="locationId.set($event)"
 *   (statusChange)="statusFilter.set($event)"
 *   (cleared)="clearFilters()"
 * />
 * ```
 */
@Component({
  selector: 'lib-appointments-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      class="flex flex-col gap-3 sm:flex-row sm:items-end"
      (submit)="$event.preventDefault()"
    >
      <!-- ===== LOCATION FILTER ===== -->
      <div class="flex-1">
        <label
          class="mb-1 block text-sm font-medium text-slate-700"
          for="filter-location"
        >
          Location
        </label>
        <select
          id="filter-location"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          [value]="locationId()"
          (change)="onLocationChange($event)"
        >
          <option value="">All locations</option>
          @for (location of locations(); track location.id) {
            <option [value]="location.id">{{ location.name }}</option>
          }
        </select>
      </div>
      <!-- ===== END: LOCATION FILTER ===== -->

      <!-- ===== STATUS FILTER ===== -->
      <div class="flex-1">
        <label
          class="mb-1 block text-sm font-medium text-slate-700"
          for="filter-status"
        >
          Status
        </label>
        <select
          id="filter-status"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          [value]="status()"
          (change)="onStatusChange($event)"
        >
          <option value="">All statuses</option>
          @for (item of statuses; track item) {
            <option [value]="item">{{ labels[item] }}</option>
          }
        </select>
      </div>
      <!-- ===== END: STATUS FILTER ===== -->

      <!-- ===== CLEAR FILTERS BUTTON ===== -->
      <button
        type="button"
        class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-40"
        [disabled]="!locationId() && !status()"
        (click)="cleared.emit()"
      >
        Clear filters
      </button>
      <!-- ===== END: CLEAR FILTERS BUTTON ===== -->
    </form>
  `,
})
export class AppointmentFiltersComponent {
  /**
   * List of available locations to populate the dropdown.
   */
  readonly locations = input.required<AppointmentLocation[]>();

  /**
   * Currently selected location ID.
   */
  readonly locationId = input('');

  /**
   * Currently selected status filter.
   */
  readonly status = input('');

  /**
   * Emits when the user selects a different location.
   */
  readonly locationChange = output<string>();

  /**
   * Emits when the user selects a different status.
   */
  readonly statusChange = output<string>();

  /**
   * Emits when the user clicks "Clear filters".
   */
  readonly cleared = output<void>();

  /** Available appointment statuses for the dropdown */
  readonly statuses = APPOINTMENT_STATUSES;

  /** Human-readable labels for each status */
  readonly labels = APPOINTMENT_STATUS_LABEL;

  /**
   * Handles location dropdown change events.
   * Emits the selected location ID to the parent component.
   *
   * @param event - DOM event from the select element
   */
  onLocationChange(event: Event): void {
    this.locationChange.emit((event.target as HTMLSelectElement).value);
  }

  /**
   * Handles status dropdown change events.
   * Emits the selected status to the parent component.
   *
   * @param event - DOM event from the select element
   */
  onStatusChange(event: Event): void {
    this.statusChange.emit((event.target as HTMLSelectElement).value);
  }
}
