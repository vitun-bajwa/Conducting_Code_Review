import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPaawordComponent } from './forgot-paaword.component';

describe('ForgotPaawordComponent', () => {
  let component: ForgotPaawordComponent;
  let fixture: ComponentFixture<ForgotPaawordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPaawordComponent]
    });
    fixture = TestBed.createComponent(ForgotPaawordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
