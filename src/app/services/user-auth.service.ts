import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { delay, map, switchMap, take, tap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  checkUserObs: Observable<any>;
  usersData: any = [];
  currentUser: any;
  public user: Observable<any>;
  // private userData = new BehaviorSubject(null);

  isUserLoggedIn: boolean = false;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private readonly platform: Platform
  ) {
    this.loadUserInfo();
    // this.fetchUsers();
  }


  useLogin(login: any): Observable<boolean> {
    if (login && login.email && login.password) {
      console.log('login details: ', login, this.usersData);
      return this.http.get('https://randomuser.me/api/').pipe(
        take(1),
        map(res => {
          this.currentUser = this.usersData.filter((u) => {
            return u.email == login.email && u.password == login.password
          })
          if (this.currentUser.length > 0) {
            this.storage.set('currentUser', this.currentUser[0])
            this.currentUser = this.currentUser[0];
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      return of(false);
    }
  }

  async fetchUsers() {
    return await this.storage.get('userList').then((data) => {
      if (data) {
        console.log('data received:', data);
        this.usersData = data;
        return this.usersData;
      }
    }, (error) => {
      console.log('db not exist: ', error);
    }).catch(err => {
      console.log('in try cathc error:', err);
    });

  }

  getCurrentUser() {
    this.storage.get('currentUser').then((data) => {
      console.log('after refreshed setting user:', data);
      if (data) {
        this.currentUser = data;
        return data;
      }
    })
  }


  loadUserInfo() {
    let readyPlatformObs = from(this.platform.ready());

    this.checkUserObs = readyPlatformObs.pipe(
      switchMap(() => {
        return from(this.getAccessToken());
      }),
      map((userData) => {
        console.log('current user', userData);
        if (!userData) {
          return null;
        }
        return true;
      }));

  }

  getAccessToken() {
    return this.storage.get('currentUser').then((data) => {
      return data
    })
  }

  logout() {
    this.storage.remove('currentUser').then(() => {
      console.log('after logout user data reset');
      this.currentUser = undefined;
      this.router.navigateByUrl("/login");
    });
  }

  // common Functions

  async presentToast(msg, dur?) {
    msg = msg ? msg : 'Alert!';
    dur = dur ? dur*1000 : 3000;
    const toast = await this.toastController.create({
      message: msg,
      duration: dur
    });
    await toast.present();
  }

  async presentAlert(hdr,msg) {
    const alert = await this.alertController.create({
      header: hdr || 'Alert!',
      subHeader: msg || '',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            // this.handlerMessage = 'Alert confirmed';
            console.log("Okay clicked!");
          },
        },
      ],
    });

    await alert.present();
  }

}