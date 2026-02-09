import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';

@Component({
  selector: 'app-layout-header',
  imports: [CommonModule, MaterialModule],
  templateUrl: './layout-header.html',
  styleUrl: './layout-header.scss',
})
export class LayoutHeader {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
