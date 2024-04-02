import { ValidatorFn } from '@angular/forms';

export function passwordvalidaator(): ValidatorFn {
  const updateControlVal = (formgroup: any, val: boolean) => {
    formgroup.parent.controls.password.errors['matched'] = val;
    formgroup.parent.controls.confirmPassword.errors['matched'] = val;
  };
  return (formgroup: any): { [key: string]: any } | null => {
    // let forbidden = false;
    if (formgroup.value) {
      formgroup.get('confirmPassword')?.updateValueAndValidity();
      if (formgroup.parent.controls.password.value !== formgroup.parent.controls.confirmPassword.value) {
        updateControlVal(formgroup, false);
        return { matched: false }
      } else {
        updateControlVal(formgroup, true);
        return { matched: true }
      }
    }
    return null;
  };


}
