import { Product } from '@ecommerce-challenge-v1/catalog-model';

/**
 * Cart Actions
 *
 * Defines all actions for cart state management using Redux-like pattern.
 * Action creators provide type-safe way to dispatch actions.
 *
 * @usage
 * // Import actions
 * import { addItem, removeItem, updateQuantity, clearCart } from './cart.actions';
 *
 * // Dispatch actions
 * store.dispatch(addItem(product));
 * store.dispatch(updateQuantity('prod-123', 5));
 * store.dispatch(clearCart());
 *
 * @types
 * - CartAction: Union type of all possible actions
 * - CartActionType: Enum of action type constants
 */

// ===== ACTION TYPES =====

/**
 * Available cart action types
 */
export enum CartActionType {
  /** Add a product to cart */
  AddItem = '[Cart] Add Item',
  /** Remove a product from cart */
  RemoveItem = '[Cart] Remove Item',
  /** Change quantity of an item */
  UpdateQuantity = '[Cart] Update Quantity',
  /** Clear all items from cart */
  ClearCart = '[Cart] Clear Cart',
}

// ===== ACTION UNIONS =====

/**
 * Union type of all cart actions
 * Used for type-safe reducer
 */
export type CartAction =
  | { type: CartActionType.AddItem; payload: Product }
  | { type: CartActionType.RemoveItem; payload: { productId: string } }
  | {
  type: CartActionType.UpdateQuantity;
  payload: { productId: string; quantity: number };
}
  | { type: CartActionType.ClearCart };

// ===== ACTION CREATORS =====

/**
 * Create AddItem action
 * @param product - Product to add to cart
 */
export const addItem = (product: Product): CartAction => ({
  type: CartActionType.AddItem,
  payload: product,
});

/**
 * Create RemoveItem action
 * @param productId - ID of product to remove
 */
export const removeItem = (productId: string): CartAction => ({
  type: CartActionType.RemoveItem,
  payload: { productId },
});

/**
 * Create UpdateQuantity action
 * @param productId - Product ID
 * @param quantity - New quantity (must be >= 1)
 */
export const updateQuantity = (
  productId: string,
  quantity: number,
): CartAction => ({
  type: CartActionType.UpdateQuantity,
  payload: { productId, quantity },
});

/**
 * Create ClearCart action
 * Clears all items from cart
 */
export const clearCart = (): CartAction => ({ type: CartActionType.ClearCart });
