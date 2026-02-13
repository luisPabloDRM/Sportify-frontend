import { TestBed } from '@angular/core/testing';

import { SportsApiService } from './sports-api.service';

describe('SportsApiService', () => {
  let service: SportsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
