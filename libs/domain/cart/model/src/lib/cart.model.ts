import { Product } from '@ecommerce-challenge-v1/catalog-model';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  itemsCount: number;
  total: number;
  isEmpty: boolean;
  loading: boolean;
  error: string | null;
}
