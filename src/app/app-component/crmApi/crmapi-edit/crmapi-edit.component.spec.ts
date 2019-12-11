import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmapiEditComponent } from './crmapi-edit.component';

describe('CrmapiEditComponent', () => {
  let component: CrmapiEditComponent;
  let fixture: ComponentFixture<CrmapiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmapiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmapiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
