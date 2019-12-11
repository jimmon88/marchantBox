import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmapiListComponent } from './crmapi-list.component';

describe('CrmapiListComponent', () => {
  let component: CrmapiListComponent;
  let fixture: ComponentFixture<CrmapiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmapiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmapiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
