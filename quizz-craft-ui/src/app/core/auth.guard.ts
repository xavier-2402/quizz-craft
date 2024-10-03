import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('tk');
  const user = localStorage.getItem('data');

  if (token && user) {
    const tokenPayload = JSON.parse(atob(token.split('.')[1])); 
    const tokenExpiration = tokenPayload.exp * 1000; 

    if (Date.now() < tokenExpiration) {
      return true; 
    }
  }

  router.navigate(['/login']); 
  return false;
};
