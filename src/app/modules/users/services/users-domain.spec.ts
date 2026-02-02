import { TestBed } from '@angular/core/testing';

import { UsersDomain } from './users-domain';

describe('UsersDomain', () => {
  let service: UsersDomain;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersDomain);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
