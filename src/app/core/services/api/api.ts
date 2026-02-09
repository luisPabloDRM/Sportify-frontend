import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor() {}
  getRoot = () => `${environment.api.url}`;
}
