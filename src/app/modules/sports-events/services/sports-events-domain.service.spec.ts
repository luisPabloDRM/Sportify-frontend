import { TestBed } from '@angular/core/testing';

import { SportsEventsDomainService } from './sports-events-domain.service';

describe('SportsEventsDomainService', () => {
  let service: SportsEventsDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsEventsDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
