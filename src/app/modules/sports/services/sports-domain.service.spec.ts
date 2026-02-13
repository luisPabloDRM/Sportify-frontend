import { TestBed } from '@angular/core/testing';

import { SportsDomainService } from './sports-domain.service';

describe('SportsDomainService', () => {
  let service: SportsDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
