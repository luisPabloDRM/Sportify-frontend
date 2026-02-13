import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsEventsOverview } from './sports-events-overview';

describe('SportsEventsOverview', () => {
  let component: SportsEventsOverview;
  let fixture: ComponentFixture<SportsEventsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsEventsOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsEventsOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
