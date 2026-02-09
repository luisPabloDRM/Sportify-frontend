import { Injectable } from '@angular/core';
import { StorageKey } from './storage.constants';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  set = (key: StorageKey, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  get = (key: StorageKey): any | null => {
    return JSON.parse(localStorage.getItem(key) ?? 'null');
  };

  delete = (key: StorageKey): void => {
    localStorage.removeItem(key);
  };
}
