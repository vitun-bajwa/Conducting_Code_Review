import { ValidatorFn } from '@angular/forms';
export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: any[];
  option?: string[];
  placeholder?: string;
  type: string;
  fieldType?: string;
  validation?: ValidatorFn[];
  value?: any;
  class?: string;
  errorMsg?: string;
  readOnly?: boolean;
  isRequired?: any;
  maxlength?: number;
  pattern?: string;
  condition?: boolean;
  record?: string[];
  heading?: string;
  inputType?: string;
  isChecked?: boolean;
  preventSpace?: boolean;
  showIcon?: boolean;
  selectOptions?: boolean;
  disableValues?: any;
  hidden?: boolean;
  updateOn?: any;
  error?: boolean;
}