import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { UserService } from '../user/user.service';

export const GuestGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.getProfile().pipe(
    switchMap(() => userService.user$),
    take(1),
    map(user => {
      if (!user) {
        return true;
      }
      router.navigate(['/home']);
      return false;
    })
  );
}
