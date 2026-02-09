import { TestBed } from '@angular/core/testing';

import { AuthenticationDomain } from './authentication-domain';

describe('AuthenticationDomain', () => {
  let service: AuthenticationDomain;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationDomain);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
