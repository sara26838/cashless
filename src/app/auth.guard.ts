import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './Services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private _authService:AuthserviceService, private router :Router){}
  canActivate(): boolean {
   if (this._authService.loggedIn()){
     return true
   }else{
     this.router.navigateByUrl('/');
     return false

   }
  }
  
}
