import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountsService } from './accounts.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _router: Router = inject(Router);
  let _authService: AccountsService = inject(AccountsService);

  if (localStorage.getItem('userToken') == null) {
    _router.navigate(['/login']);
    return false;
  } else {
    _authService.decodeUserToken();
    return true;
  }
};
