import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationLogIn } from './authentication-log-in';

describe('AuthenticationLogIn', () => {
  let component: AuthenticationLogIn;
  let fixture: ComponentFixture<AuthenticationLogIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationLogIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationLogIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
