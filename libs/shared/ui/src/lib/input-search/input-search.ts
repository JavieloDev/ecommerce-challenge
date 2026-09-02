import { Component, input, output } from '@angular/core';

/**
 * InputSearchComponent
 *
 * Reusable search input with a magnifying glass icon.
 * Supports two-way binding for search term.
 *
 * @usage
 * <app-input-search
 *   [value]="searchTerm()"
 *   (valueChange)="searchTerm.set($event)"
 * />
 *
 * @inputs
 * - value: string - Current search term (default: '')
 *
 * @outputs
 * - valueChange: string - Emits when user types
 */
@Component({
  selector: 'app-input-search',
  standalone: true,
  template: `
    <div class="relative">
      <svg
        class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <!-- Input field -->
      <input
        type="text"
        placeholder="Buscar producto..."
        [value]="value()"
        (input)="valueChange.emit($any($event.target).value)"
        class="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  `,
})
export class InputSearchComponent {
  /** Current search value */
  value = input('');

  /** Emits new search term on each keystroke */
  valueChange = output<string>();
}
