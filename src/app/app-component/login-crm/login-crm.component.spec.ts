import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCrmComponent } from './login-crm.component';

describe('LoginCrmComponent', () => {
  let component: LoginCrmComponent;
  let fixture: ComponentFixture<LoginCrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
