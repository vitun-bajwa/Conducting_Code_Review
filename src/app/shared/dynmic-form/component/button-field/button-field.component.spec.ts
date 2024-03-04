import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFieldComponent } from './button-field.component';

describe('ButtonFieldComponent', () => {
  let component: ButtonFieldComponent;
  let fixture: ComponentFixture<ButtonFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
