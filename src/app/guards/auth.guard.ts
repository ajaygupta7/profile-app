import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserAuthService } from '../services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuth: UserAuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userAuth.checkUserObs.pipe(
        take(1),
        map((user) => {
          if (!user) {
            if (state.url.indexOf("login") != -1) {
              return true;
            } else {
              this.router.navigateByUrl("/login");
              return false;
            }
          } else {
            if(state.url.indexOf("login") != -1){
              this.router.navigateByUrl("/dashboard");
              return false;
            }else{
               return true;
            }
          }
        })
      );
    // return true;
  }
  
}
