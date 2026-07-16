import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout-footer',
  imports: [MatIconModule],
  templateUrl: './layout-footer.html',
  styleUrl: './layout-footer.scss',
})
export class LayoutFooter {
  protected readonly year = new Date().getFullYear();
}
