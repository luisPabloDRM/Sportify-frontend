import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';

@Component({
  selector: 'app-sports-events-dashboard',
  imports: [CommonModule, MaterialModule],
  templateUrl: './sports-events-dashboard.html',
  styleUrl: './sports-events-dashboard.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SportsEventsDashboard {

}
