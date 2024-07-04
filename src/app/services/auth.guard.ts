import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isAuth = Boolean(localStorage.getItem('isAuth')) ? true : false;
  if (!isAuth) {
    router.navigate(['/login']);
    return false;
  }

  return isAuth;
};

export const AnonymousGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isAuth = Boolean(localStorage.getItem('isAuth')) ? true : false;
  if (isAuth) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
