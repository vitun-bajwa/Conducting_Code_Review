import { ValidatorFn } from '@angular/forms';
export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: any[];
  placeholder?: string;
  type?: string;
  fieldType?: string;
  validation?: ValidatorFn[];
  value?: any;
  class?: string;
  readOnly?: boolean;
  isRequired?: any;
  hidden?: boolean;
  error?: boolean;
  hint?: any;
}