import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutHeader } from './layout-header/layout-header';
import { LayoutFooter } from './layout-footer/layout-footer';
import { LayoutMenu } from './layout-menu/layout-menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, LayoutHeader, LayoutFooter, LayoutMenu],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
