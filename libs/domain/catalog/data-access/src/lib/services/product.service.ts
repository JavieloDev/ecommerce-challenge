import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { Product } from '@ecommerce-challenge-v1/catalog-model';
import { ApiResponse } from '@ecommerce-challenge-v1/core-model';

/**
 * ProductsService
 *
 * Fetches product catalog data from a mock JSON file.
 * Manages loading and error states using signals.
 *
 * @usage
 * productsService = inject(ProductsService);
 * products = toSignal(productsService.getProducts(), { initialValue: null });
 *
 * @dependencies
 * - HttpClient: Makes HTTP request
 *
 * @state
 * - loading: ReadonlySignal<boolean> - Loading indicator
 * - error: ReadonlySignal<string | null> - Error message if any
 */
@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  // ===== PRIVATE STATE =====
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // ===== PUBLIC STATE (Readonly) =====
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  /**
   * Fetches product list from mock JSON file
   * @returns Observable of ApiResponse<Product[]>
   *
   * @example
   * this.productsService.getProducts().subscribe({
   *   next: (response) => console.log(response.data),
   *   error: (err) => console.error(err)
   * });
   */
  getProducts(): Observable<ApiResponse<Product[]>> {
    this._loading.set(true);
    this._error.set(null);

    return this.http
      .get<ApiResponse<Product[]>>('assets/product-mock.json')
      .pipe(
        catchError((err) => {
          this._error.set('Error al cargar los productos');
          return of({
            code: 500,
            status: 'error' as const,
            message: 'Error al cargar los productos',
            data: [] as Product[],
          });
        }),
        finalize(() => this._loading.set(false)),
      );
  }
}
