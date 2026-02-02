import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import * as R from 'remeda';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  composeHttpParams = (values: Record<string, any>, parameters = new HttpParams()) => {
    return R.pipe(
      R.entries(values),
      R.reduce((params, item) => {
        const [key, value] = item;

        switch (typeof value) {
          case 'string': {
            return params.set(key, value);
          }
          case 'number': {
            return params.set(key, value.toString());
          }
          case 'undefined': {
            return params.set(key, '');
          }
          case 'object': {
            if (DateTime.isDateTime(value)) {
              return params.set(key, value.toUTC().toFormat('yyyy-LL-dd HH:mm:ss') ?? '');
            }
            if (Array.isArray(value)) {
              return R.reduce(value, (params, v) => params.append(`${key}[]`, v), params);
            }
            if (typeof value?.toString === 'function') {
              return params.set(key, value.toString());
            }
            if (value != null) {
              return params.set(key, String(value));
            }
            return params;
          }
          default: {
            return params.set(key, String(value));
          }
        }
      }, parameters)
    );
  };
}
