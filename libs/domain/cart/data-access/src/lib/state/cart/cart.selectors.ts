import { CartState } from '@ecommerce-challenge-v1/cart-model';

/**
 * Cart Selectors
 *
 * Pure functions that extract specific pieces of state from CartState.
 * Used with CartStore's select() method to create reactive signals.
 *
 * @usage
 * // In component or facade
 * store = inject(CartStore);
 *
 * items = store.select(selectCartItems);
 * total = store.select(selectCartTotal);
 * itemsCount = store.select(selectCartItemsCount);
 * isEmpty = store.select(selectIsEmpty);
 * error = store.select(selectCartError);
 *
 * @pattern
 * - Selector: (state) => state.property
 * - Each selector extracts a single piece of state
 * - Used with computed() for reactivity
 */

// ===== STATE SELECTORS =====

/** Select all cart items */
export const selectCartItems = (state: CartState) => state.items;

/** Select total number of items (sum of quantities) */
export const selectCartItemsCount = (state: CartState) => state.itemsCount;

/** Select total price of all items */
export const selectCartTotal = (state: CartState) => state.total;

/** Select whether cart is empty */
export const selectIsEmpty = (state: CartState) => state.isEmpty;

/** Select error message (if any) */
export const selectCartError = (state: CartState) => state.error;
