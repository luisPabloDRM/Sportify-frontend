import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOverview } from './users-overview';

describe('UsersOverview', () => {
  let component: UsersOverview;
  let fixture: ComponentFixture<UsersOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
