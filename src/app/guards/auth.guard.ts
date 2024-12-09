import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLogged) {
    return true;
  }

  // Redirect to login and preserve intended destination
  router.navigate(['/login'], { 
    queryParams: { returnUrl: state.url }
  });
  return false;
};