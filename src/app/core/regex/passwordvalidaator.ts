import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordvalidaator(): ValidatorFn {
  return (formgroup: any): { [key: string]: any } | null => {
    let forbidden = false;
    if (formgroup.value) {
      formgroup.get('confirmPassword')?.updateValueAndValidity();
      if (formgroup.parent.controls.password.value !== formgroup.parent.controls.confirmPassword.value) {

        forbidden = true;
        return forbidden ? { matched: true } : null!;
      }else{
      }
    }
    return null;
  };
}
