import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDialogComponent } from './request-dialog.component';

describe('RequestDialogComponent', () => {
  let component: RequestDialogComponent;
  let fixture: ComponentFixture<RequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDialogComponent]
    });
    fixture = TestBed.createComponent(RequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
