import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsEventsOverviewItems } from './sports-events-overview-items';

describe('SportsEventsOverviewItems', () => {
  let component: SportsEventsOverviewItems;
  let fixture: ComponentFixture<SportsEventsOverviewItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsEventsOverviewItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsEventsOverviewItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
