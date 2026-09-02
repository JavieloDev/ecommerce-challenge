import { CartAction, CartActionType } from './cart.actions';
import { CartItem, CartState } from '@ecommerce-challenge-v1/cart-model';

/**
 * Cart Reducer
 *
 * Pure function that handles cart state updates based on actions.
 * Uses a builder pattern to derive computed state (total, count, isEmpty).
 *
 * @usage
 * // Used by CartStore
 * store.dispatch(addItem(product));
 * // Reducer automatically computes new state
 *
 * @features
 * - Stock validation on add/update
 * - Automatic calculation of totals
 * - Error handling for stock limits
 *
 * @state
 * - items: CartItem[]
 * - itemsCount: number (derived)
 * - total: number (derived)
 * - isEmpty: boolean (derived)
 * - loading: boolean
 * - error: string | null
 */

// ===== INITIAL STATE =====

/**
 * Default cart state
 * Empty cart with all computed values initialized
 */
export const initialCartState: CartState = {
  items: [],
  itemsCount: 0,
  total: 0,
  isEmpty: true,
  loading: false,
  error: null,
};

// ===== STATE BUILDER =====

/**
 * Builds a new CartState from items list
 * Automatically computes derived values:
 * - itemsCount: Sum of all quantities
 * - total: Sum of price × quantity
 * - isEmpty: True if no items
 *
 * @param items - Cart items list
 * @param error - Optional error message
 * @returns Complete CartState
 */
function buildState(items: CartItem[], error: string | null = null): CartState {
  return {
    items,
    itemsCount: items.length,
    total: items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
    isEmpty: items.length === 0,
    loading: false,
    error,
  };
}

// ===== REDUCER =====

/**
 * Pure reducer function for cart state
 * Handles all cart actions and returns new state
 *
 * @param state - Current CartState (defaults to initialCartState)
 * @param action - CartAction to process
 * @returns New CartState
 *
 * @action AddItem
 * - Adds product or increments quantity
 * - Validates stock availability
 * - Sets error if stock exceeded
 *
 * @action RemoveItem
 * - Removes product by ID
 *
 * @action UpdateQuantity
 * - Updates quantity for specific product
 * - Validates stock limits
 * - Removes item if quantity <= 0
 *
 * @action ClearCart
 * - Resets to initial state
 */
export function cartReducer(
  state: CartState = initialCartState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case CartActionType.AddItem: {
      const product = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      const currentQty = existing?.quantity ?? 0;

      // Stock validation
      if (currentQty >= product.stock) {
        return { ...state, error: `Sin stock suficiente de "${product.name}"` };
      }

      // Add or update item
      const items = existing
        ? state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [...state.items, { product, quantity: 1, addedAt: new Date() }];

      return buildState(items);
    }

    case CartActionType.RemoveItem: {
      const items = state.items.filter(
        (i) => i.product.id !== action.payload.productId,
      );
      return buildState(items);
    }

    case CartActionType.UpdateQuantity: {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.product.id === productId);

      // Stock validation
      if (item && quantity > item.product.stock) {
        return {
          ...state,
          error: `Solo hay ${item.product.stock} unidades disponibles`,
        };
      }

      // Update or remove (if quantity <= 0)
      const items = state.items
        .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0);

      return buildState(items);
    }

    case CartActionType.ClearCart:
      return { ...initialCartState };

    default:
      return state;
  }
}
