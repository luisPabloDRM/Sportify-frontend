import { TestBed } from '@angular/core/testing';

import { PasswordRecoveriesApi } from './password-recoveries-api';

describe('PasswordRecoveriesApi', () => {
  let service: PasswordRecoveriesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordRecoveriesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
