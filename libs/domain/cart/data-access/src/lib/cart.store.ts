import { computed, Injectable, signal } from '@angular/core';
import { CartState } from '@ecommerce-challenge-v1/cart-model';
import { CartAction } from './state/cart/cart.actions';
import { cartReducer, initialCartState } from './state/cart/cart.reducer';

/**
 * CartStore
 *
 * Lightweight state management using Angular Signals with a reducer pattern.
 * Custom implementation without NgRx - pure signals for reactive state.
 *
 * @usage
 * store = inject(CartStore);
 *
 * // Read state
 * items = store.select(selectCartItems); // Signal<CartItem[]>
 * state = store.state; // ReadonlySignal<CartState>
 *
 * // Dispatch actions
 * store.dispatch(addItem(product));
 * store.dispatch(updateQuantity(id, 5));
 *
 * @dependencies
 * - None (pure Angular Signals only)
 *
 * @state
 * - CartState: { items: CartItem[], error: string | null }
 *
 * @pattern
 * - Redux-inspired reducer pattern with Signals
 */
@Injectable({ providedIn: 'root' })
export class CartStore {
  /**
   * Private reactive state using signal
   * Initialized with default cart state
   */
  private readonly _state = signal<CartState>(initialCartState);

  /**
   * Read-only version of state for external access
   * Prevents direct mutation from outside
   */
  readonly state = this._state.asReadonly();

  /**
   * Dispatches an action to update the cart state
   * Uses pure reducer function to compute new state
   *
   * @param action - CartAction to process (add, remove, update, clear)
   *
   * @example
   * store.dispatch(addItem(product));
   * store.dispatch(clearCart());
   */
  dispatch(action: CartAction): void {
    this._state.update((currentState) => cartReducer(currentState, action));
  }

  /**
   * Creates a computed signal from a selector function
   * Automatically updates when state changes
   *
   * @param selector - Pure function that extracts a value from state
   * @returns Computed signal with selected value
   *
   * @example
   * items = store.select(selectCartItems);
   * total = store.select(selectCartTotal);
   * isEmpty = store.select(selectIsEmpty);
   */
  select<T>(selector: (state: CartState) => T) {
    return computed(() => selector(this._state()));
  }
}
