import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { usersUpdateGuard } from './users.update-guard';

describe('usersUpdateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => usersUpdateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
