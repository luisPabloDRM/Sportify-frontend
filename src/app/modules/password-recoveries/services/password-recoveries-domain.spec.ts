import { TestBed } from '@angular/core/testing';

import { PasswordRecoveriesDomain } from './password-recoveries-domain';

describe('PasswordRecoveriesDomain', () => {
  let service: PasswordRecoveriesDomain;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordRecoveriesDomain);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
