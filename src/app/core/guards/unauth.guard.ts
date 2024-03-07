import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CanDeactivateFn } from '@angular/router';

export const unauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  
  return true;
};
