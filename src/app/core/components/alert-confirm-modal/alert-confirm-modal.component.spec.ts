import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfirmModalComponent } from './alert-confirm-modal.component';

describe('AlertConfirmModalComponent', () => {
  let component: AlertConfirmModalComponent;
  let fixture: ComponentFixture<AlertConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
