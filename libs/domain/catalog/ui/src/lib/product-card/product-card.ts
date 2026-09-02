import { Component, input, output, signal } from '@angular/core';
import { Product } from '@ecommerce-challenge-v1/catalog-model';
import { CurrencyPipe } from '@angular/common';
import { TruncatePipe } from '@ecommerce-challenge-v1/shared-pipes';

/**
 * Product card with image, name, price, and add-to-cart action.
 * Handles image loading errors with fallback UI.
 *
 * @example
 * <app-product-card [product]="item" (addToCart)="addItem($event)" />
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  imports: [CurrencyPipe, TruncatePipe],
})
export class ProductCardComponent {
  /** Required product data */
  product = input.required<Product>();

  /** Emits when adding product to cart */
  addToCart = output<Product>();

  /** Image load error state */
  imageError = signal(false);

  /** Add product to cart */
  onAddToCart() {
    this.addToCart.emit(this.product());
  }

  /** Handle image load error */
  onImageError() {
    this.imageError.set(true);
  }
}
