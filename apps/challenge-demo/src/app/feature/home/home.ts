import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from '../../core/components/topbar/topbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, Topbar],
  templateUrl: './home.html',
})
export class Home {
  /** Current year for footer copyright */
  currentYear = new Date().getFullYear();
}
