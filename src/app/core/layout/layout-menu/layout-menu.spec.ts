import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMenu } from './layout-menu';

describe('LayoutMenu', () => {
  let component: LayoutMenu;
  let fixture: ComponentFixture<LayoutMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
