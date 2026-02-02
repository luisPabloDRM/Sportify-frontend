import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { AuthUser } from '../../../core/services/auth-user/auth-user';

@Component({
  selector: 'app-page-not-found',
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
  protected readonly link: string[];

  constructor(private readonly authUserService: AuthUser) {
    this.link = this.authUserService.get() ? ['/dashboard'] : ['/authentication'];
  }
}
