import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'app-sports-events',
  imports: [CommonModule, RouterOutlet, MaterialModule],
  templateUrl: './sports-events.html',
  styleUrl: './sports-events.scss',
})
export class SportsEvents {

}
