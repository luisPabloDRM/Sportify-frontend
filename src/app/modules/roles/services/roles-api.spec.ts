import { TestBed } from '@angular/core/testing';

import { RolesApi } from './roles-api';

describe('RolesApi', () => {
  let service: RolesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
