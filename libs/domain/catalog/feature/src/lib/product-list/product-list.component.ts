import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '@ecommerce-challenge-v1/catalog-data-access';
import { ProductCardComponent } from '@ecommerce-challenge-v1/catalog-ui';
import { Product } from '@ecommerce-challenge-v1/catalog-model';
import { CartFacade } from '@ecommerce-challenge-v1/cart-data-access';
import { InputSearchComponent } from '@ecommerce-challenge-v1/shared-ui';

/**
 * Topbar
 *
 * Displays a catalog of products with search, filtering, and cart integration.
 *
 * @usage
 * <app-product-list></app-product-list>
 *
 * @dependencies
 * - ProductsService: Fetches product data
 * - CartFacade: Manages cart state
 * - ProductCardComponent: Renders individual product cards
 * - InputSearchComponent: Search input field
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, InputSearchComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  private productsService = inject(ProductsService);
  private cartFacade = inject(CartFacade);

  /** HTTP response signal from API */
  private response = toSignal(this.productsService.getProducts(), {
    initialValue: null,
  });

  /** List of products or empty array */
  products = computed(() => this.response()?.data ?? []);

  /** Loading state from service */
  loading = this.productsService.loading;

  /** Error state from service */
  error = this.productsService.error;

  /** Search term for filtering products */
  searchTerm = signal('');

  /** Selected category filter */
  selectedCategory = signal<string | null>(null);

  /**
   * Filters products by category and search term
   * @returns Filtered product list
   */
  filteredProducts = computed(() => {
    let list = this.products();

    if (this.selectedCategory()) {
      list = list.filter((p) => p.category === this.selectedCategory());
    }

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(term));
    }

    return list;
  });

  /**
   * Adds product to cart
   * @param product - Product to add
   */
  onAddToCart(product: Product) {
    this.cartFacade.addProduct(product);
  }
}
