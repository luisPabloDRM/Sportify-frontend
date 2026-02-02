import { TestBed } from '@angular/core/testing';

import { RolesDomain } from './roles-domain';

describe('RolesDomain', () => {
  let service: RolesDomain;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesDomain);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
