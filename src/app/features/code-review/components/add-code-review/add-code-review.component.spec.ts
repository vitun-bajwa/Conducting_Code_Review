import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodeReviewComponent } from './add-code-review.component';

describe('AddCodeReviewComponent', () => {
  let component: AddCodeReviewComponent;
  let fixture: ComponentFixture<AddCodeReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCodeReviewComponent]
    });
    fixture = TestBed.createComponent(AddCodeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
