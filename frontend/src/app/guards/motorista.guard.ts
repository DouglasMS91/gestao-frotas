import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DOCUMENT } from '@angular/common';

export const MotoristaGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated() && auth.isMotorista()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
