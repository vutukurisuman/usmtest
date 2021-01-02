import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private _router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
    if (localStorage.getItem('token')) {  
        return true;  
    }  
    this._router.navigate(['']);  
    return false;  
}
}
