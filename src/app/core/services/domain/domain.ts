import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class Domain {
  constructor(){}

  parseCommonEntityAttributes = <T extends { createdAt: string; updatedAt: string}> (data: T) => {
    const createdAt = DateTime.fromISO(data.createdAt);
    const updatedAt = DateTime.fromISO(data.updatedAt);
    if(!createdAt.isValid || !updatedAt.isValid){
      throw new Error('InvalidDate');
    }
    return {createdAt, updatedAt}
  }
}
