import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsOverview } from './sports-overview';

describe('SportsOverview', () => {
  let component: SportsOverview;
  let fixture: ComponentFixture<SportsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
