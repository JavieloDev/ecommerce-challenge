import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '@ecommerce-challenge-v1/cart-model';
import { TimeAgoPipe } from '@ecommerce-challenge-v1/shared-pipes';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-item.html',
})
export class CartItemComponent {
  /** Current cart item  */
  item = input.required<CartItem>();

  /** Emits new quantity value when user updates it */
  quantityChange = output<number>();

  /** Emits product ID when user clicks remove button */
  remove = output<string>();
}
