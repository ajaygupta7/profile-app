import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor(
    private storage:Storage,) { }

  validatePattern(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&()`.+,/"-]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser']; // userList from storage
    return (UserList.indexOf(userName) > -1);
  }

  fetchUsers() {
    // fetch users here from storge
    let returnrdUser =this.storage.get('users');
    console.log('returned data:', returnrdUser)
    returnrdUser.then((data) => {
     if(data) {
     let ab= data.filter((u) => {
       return u.type == "Fiat"
     })
     console.log('ajay ab:', ab);
   }
    })
  }
}
