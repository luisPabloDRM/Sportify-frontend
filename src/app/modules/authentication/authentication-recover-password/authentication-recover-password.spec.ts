import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationRecoverPassword } from './authentication-recover-password';

describe('AuthenticationRecoverPassword', () => {
  let component: AuthenticationRecoverPassword;
  let fixture: ComponentFixture<AuthenticationRecoverPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationRecoverPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationRecoverPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
