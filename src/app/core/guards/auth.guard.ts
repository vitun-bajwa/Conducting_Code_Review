import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  let authenticated = sessionStorage.getItem('token');
      if (!authenticated) {
        router.navigate(['/auth/login']);
        return false;
      }else {
        return true;
      }
}