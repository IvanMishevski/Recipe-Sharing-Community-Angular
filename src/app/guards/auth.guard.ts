
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { map, switchMap, take } from 'rxjs';
import { inject } from '@angular/core';

/**
 * An Angular route guard that checks if the user is logged in before allowing access to a route.
 * If the user is not logged in, the guard will navigate to the home page.
 */
export const AuthGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.getProfile().pipe(
    switchMap(() => userService.user$),
    take(1),
    map(user => {
      if (user) {
        return true;
      }
      router.navigate(['/']);
      return false;
    })
  );
}


