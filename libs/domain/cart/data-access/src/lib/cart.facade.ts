import { inject, Injectable } from '@angular/core';
import { Product } from '@ecommerce-challenge-v1/catalog-model';
import {
  selectCartError,
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
  selectIsEmpty,
} from './state/cart/cart.selectors';
import { CartStore } from './cart.store';
import {
  addItem,
  clearCart,
  removeItem,
  updateQuantity,
} from './state/cart/cart.actions';

/**
 * CartFacade
 *
 * Facade service for cart state management using custom Signal Store.
 * Provides a clean API for cart operations and state selection.
 *
 * @usage
 * cartFacade = inject(CartFacade);
 *
 * // Read state
 * items = cartFacade.items; // Signal<CartItem[]>
 * total = cartFacade.total; // Signal<number>
 *
 * // Dispatch actions
 * cartFacade.addProduct(product);
 * cartFacade.changeQuantity(productId, 5);
 *
 * @dependencies
 * - CartStore: Custom signal-based store
 * - selectors: Cart state selectors
 * - actions: Cart action creators
 */
@Injectable({ providedIn: 'root' })
export class CartFacade {
  private readonly store = inject(CartStore);


  /** Cart items list */
  readonly items = this.store.select(selectCartItems);

  /** Total price of all items */
  readonly total = this.store.select(selectCartTotal);

  /** Total number of items */
  readonly itemsCount = this.store.select(selectCartItemsCount);

  /** Whether cart is empty */
  readonly isEmpty = this.store.select(selectIsEmpty);

  /** Error state */
  readonly error = this.store.select(selectCartError);


  /**
   * Adds a product to cart
   * @param product - Product to add
   */
  addProduct(product: Product): void {
    this.store.dispatch(addItem(product));
  }

  /**
   * Removes a product from cart
   * @param productId - ID of product to remove
   */
  removeProduct(productId: string): void {
    this.store.dispatch(removeItem(productId));
  }

  /**
   * Updates quantity of a cart item
   * @param productId - Product ID
   * @param quantity - New quantity (>= 1)
   */
  changeQuantity(productId: string, quantity: number): void {
    this.store.dispatch(updateQuantity(productId, quantity));
  }

  /**
   * Clears all items from cart
   */
  clear(): void {
    this.store.dispatch(clearCart());
  }
}
