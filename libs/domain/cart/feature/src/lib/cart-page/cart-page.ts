import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartFacade } from '@ecommerce-challenge-v1/cart-data-access';

/**
 * CartPageComponent
 *
 * Displays the shopping cart page with item list, quantity controls, and total.
 * Uses CartFacade for state management.
 *
 * @usage
 * <app-cart-page></app-cart-page>
 *
 * @dependencies
 * - CartFacade: Manages cart state (items, count, total, actions)
 *
 * @features
 * - List cart items with product details
 * - Update item quantities with stock validation
 * - Remove individual items
 * - Clear entire cart
 * - Empty state display
 * - OnPush change detection for performance
 */
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-page.html',
})
export class CartPageComponent {
  /** Public facade for cart state and actions */
  public readonly cartFacade = inject(CartFacade);
}
