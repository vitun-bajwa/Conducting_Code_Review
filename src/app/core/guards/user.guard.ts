import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { commonEnum, getItem, routes } from '../enums/common.enum';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  let authenticated :any= JSON.parse(sessionStorage.getItem(getItem.user)!);
      if (authenticated.userRole !== commonEnum.Admin && authenticated.userRole !== commonEnum.superAdmin) {
        router.navigate([routes.codeReview]);
        return false;
      }else {
        return true;
      }
};
