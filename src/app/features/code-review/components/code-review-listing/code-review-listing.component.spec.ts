import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeReviewListingComponent } from './code-review-listing.component';

describe('CodeReviewListingComponent', () => {
  let component: CodeReviewListingComponent;
  let fixture: ComponentFixture<CodeReviewListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeReviewListingComponent]
    });
    fixture = TestBed.createComponent(CodeReviewListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
