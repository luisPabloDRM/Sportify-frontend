import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsEvents } from './sports-events';

describe('SportsEvents', () => {
  let component: SportsEvents;
  let fixture: ComponentFixture<SportsEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
