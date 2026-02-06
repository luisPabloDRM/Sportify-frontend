import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './authentication.html',
  styleUrl: './authentication.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Authentication {

}
