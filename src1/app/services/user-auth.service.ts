import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  constructor(
    private readonly storage:Storage
  ) {}


  useLogin(login: any): Observable<boolean> {
    if (login && login.email && login.password) {
     var sampleJwt =
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";
    
     return of(sampleJwt).pipe(
     map((token) => {
      console.log('token: ', token);
       if (!token) {
       return false;
       }
       this.storage.set('access_token',token);
       var decodedUser = this.jwtHelper.decodeToken(token);
       this.userInfo.next(decodedUser);
       console.log(decodedUser);
       return true;
     })
     );
    } else {
      return of(false);
    }
   }


   userLogin(login: any): Observable<boolean> {
    if (login && login.email && login.password) {
     var sampleJwt =
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";
    
     return of(sampleJwt).pipe(
     map((token) => {
       if (!token) {
       return false;
       }
       this.storage.set('access_token',token);
       var decodedUser = this.jwtHelper.decodeToken(token);
       this.userInfo.next(decodedUser);
       console.log(decodedUser);
       return true;
     })
     );
    } else {
      return of(false);
    }
   }
}
