import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmapiAddComponent } from './crmapi-add.component';

describe('CrmapiAddComponent', () => {
  let component: CrmapiAddComponent;
  let fixture: ComponentFixture<CrmapiAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmapiAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmapiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
