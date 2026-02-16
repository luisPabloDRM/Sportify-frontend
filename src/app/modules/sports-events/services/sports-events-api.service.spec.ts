import { TestBed } from '@angular/core/testing';

import { SportsEventsApiService } from './sports-events-api.service';

describe('SportsEventsApiService', () => {
  let service: SportsEventsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsEventsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
