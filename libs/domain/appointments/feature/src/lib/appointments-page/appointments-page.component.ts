import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  Appointment,
  AppointmentsFacade,
  MOCK_LOCATIONS,
} from '@ecommerce-challenge-v1/appointments-data-access';
import { AppointmentStatus } from '@ecommerce-challenge-v1/appointments-model';
import {
  AppointmentFiltersComponent,
  AppointmentListComponent, ToastComponent,
} from '@ecommerce-challenge-v1/appointments-ui';

@Component({
  selector: 'lib-appointments-page',
  imports: [
    AppointmentListComponent,
    AppointmentFiltersComponent,
    ToastComponent,
  ],
  templateUrl: './appointments-page.component.html',
})
export class AppointmentsPageComponent implements OnInit {
  /** Domain API: load, update, screen state. Not the mock service. */
  readonly facade = inject(AppointmentsFacade);

  readonly locations = MOCK_LOCATIONS;
  readonly locationId = signal('');
  readonly statusFilter = signal('');

  /**
   * Page-only filter. The facade holds the full list; this view derives a subset.
   */
  readonly visible = computed(() => {
    const locationId = this.locationId();
    const status = this.statusFilter();

    return this.facade.appointments().filter((item: Appointment) => {
      const matchesLocation = !locationId || item.location.id === locationId;
      const matchesStatus = !status || item.status === status;
      return matchesLocation && matchesStatus;
    });
  });

  ngOnInit() {
    this.facade.load();
  }

  /** Clears location and status so the list shows every loaded appointment. */
  clearFilters(): void {
    this.locationId.set('');
    this.statusFilter.set('');
  }

  /** Forwards the list event to the facade; the page does not call the API. */
  onStatusChange(event: { id: string; status: AppointmentStatus }): void {
    this.facade.updateStatus(event.id, event.status);
  }
}
