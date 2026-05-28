import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthUser } from '../../services/auth-user/auth-user';
import { AuthenticationDomain } from '../../../modules/authentication/services/authentication-domain';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-layout-header',
  imports: [CommonModule, MaterialModule, RouterLink, RouterLinkActive, MatMenuModule],
  templateUrl: './layout-header.html',
  styleUrl: './layout-header.scss',
})
export class LayoutHeader {
  private readonly authUser = inject(AuthUser);
  private readonly authDomain = inject(AuthenticationDomain);

  isMenuOpen = false;

  protected get user() {
    return this.authUser.get()?.user ?? null;
  }

  /** Devuelve las iniciales del nombre completo (máx. 2 letras) */
  protected get initials(): string {
    const name = this.user?.fullname ?? '';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  protected logOut() {
    this.authDomain.logOut();
  }
}
