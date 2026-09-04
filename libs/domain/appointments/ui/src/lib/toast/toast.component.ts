import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Presentational toast. Same shape the facade emits; ui does not import the facade. */
export type ToastView = {
  type: 'success' | 'error' | 'info';
  text: string;
};

@Component({
  selector: 'lib-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (toast(); as t) {
      <!-- ===== FLOATING TOAST NOTIFICATION ===== -->
      @if (toast(); as t) {
        <div
          class="fixed right-2 top-20 sm:top-16 z-50 max-w-sm animate-in slide-in-from-top-2 fade-in duration-300"
          role="alert"
          aria-live="polite"
        >
          <div
            class="flex items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg"
            [class]="toneClass()"
          >
            @switch (t.type) {
              @case ('success') {
                <svg
                  class="h-5 w-5 shrink-0 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
              @case ('error') {
                <svg
                  class="h-5 w-5 shrink-0 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
              @case ('info') {
                <svg
                  class="h-5 w-5 shrink-0 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
            }

            <span class="flex-1 font-medium">{{ t.text }}</span>
          </div>
        </div>
      }
      <!-- ===== END: FLOATING TOAST NOTIFICATION ===== -->
    }
  `,
})
export class ToastComponent {
  readonly toast = input<ToastView | null>(null);

  readonly toneClass = computed(() => {
    switch (this.toast()?.type) {
      case 'error':
        return 'border-rose-200 bg-rose-50 text-rose-800';
      case 'success':
        return 'border-emerald-200 bg-emerald-50 text-emerald-800';
      default:
        return 'border-slate-200 bg-slate-50 text-slate-700';
    }
  });
}
