/**
 * Pagination metadata for paginated responses
 */
export interface Pagination {
  /** Current page number (1-based) */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items available */
  totalItems: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Standard API response wrapper
 * @template T - Type of data payload
 */
export interface ApiResponse<T> {
  code: number;
  status: 'success' | 'error';
  message: string;
  data: T;
  pagination?: Pagination;
}
