import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsEventsDashboard } from './sports-events-dashboard';

describe('SportsEventsDashboard', () => {
  let component: SportsEventsDashboard;
  let fixture: ComponentFixture<SportsEventsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsEventsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsEventsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
