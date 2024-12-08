import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

export const LoggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state:RouterStateSnapshot
) => {
  const userService = inject(UserService);
  const router = inject(Router);
  console.log(userService.isLogged);
  

  if (userService.isLogged) {
    router.navigate(['/home']);  
    return false;
  }

  return true;
}
