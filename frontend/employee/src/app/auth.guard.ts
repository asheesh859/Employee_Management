import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  var userLogin = JSON.parse(String(localStorage.getItem('currentUser')))
  var _route= inject(Router);
  if(userLogin){
    return true
  }else{
      _route.navigate(['login'])
    return false;
  }
  
};  
