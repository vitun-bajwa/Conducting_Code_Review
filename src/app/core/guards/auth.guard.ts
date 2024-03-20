import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getItem } from '../enums/common.enum';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  let authenticated = sessionStorage.getItem(getItem.token);
      if (!authenticated) {
        router.navigate(['/auth/login']);
        return false;
      }else {
        return true;
      }
}