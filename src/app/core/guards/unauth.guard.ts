import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CanDeactivateFn } from '@angular/router';
import { getItem } from '../enums/common.enum';

export const unauthGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
   let authenticated = sessionStorage.getItem(getItem.token)
      if (authenticated) {
        router.navigate(['/user']);
        return false;
      }else {
        return true;
      }
};
