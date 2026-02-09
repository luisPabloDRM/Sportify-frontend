import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationRequestRecovery } from './authentication-request-recovery';

describe('AuthenticationRequestRecovery', () => {
  let component: AuthenticationRequestRecovery;
  let fixture: ComponentFixture<AuthenticationRequestRecovery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationRequestRecovery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationRequestRecovery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
