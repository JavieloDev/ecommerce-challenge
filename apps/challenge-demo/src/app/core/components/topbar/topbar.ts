import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartFacade } from '@ecommerce-challenge-v1/cart-data-access';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './topbar.html',
})
export class Topbar {
  /** Cart facade for state management */
  protected cartFacade = inject(CartFacade);
}
