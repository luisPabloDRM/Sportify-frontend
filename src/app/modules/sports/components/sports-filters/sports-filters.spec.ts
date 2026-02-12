import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsFilters } from './sports-filters';

describe('SportsFilters', () => {
  let component: SportsFilters;
  let fixture: ComponentFixture<SportsFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
