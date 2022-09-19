import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationService } from '../services/custom-validation.service';
import { UserAuthService } from '../services/user-auth.service';
​
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
​
​
  loginForm: FormGroup;
  constructor(private userAuth:UserAuthService,
    private fb: FormBuilder,
    private router: Router,
    private customValidator: CustomValidationService) { }
 
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.validatePattern()])]
    }
    );
  }
 
  async login(){
    if (!this.loginForm.valid) {
      return;
    }
    this.userAuth.fetchUsers();
    // this.userAuth.login(this.loginForm)
    this.userAuth.useLogin(this.loginForm.value)
    .subscribe(value => {
      console.log('value: ', value);
      if(value){
        // alert('login success');
        this.router.navigateByUrl("/dashboard");
        this.userAuth.getCurrentUser();
        let msg = 'Welcome ' + this.userAuth.currentUser?.firstName + ' ' + this.userAuth.currentUser?.lastName
        this.userAuth.presentToast(msg);
      } else{
        this.userAuth.presentAlert("Login Failed!","Email or Password wrong!");
      }
    },(error) => {
      console.log('ajay testt error:', error);
      // alert('login fails')
    })
 }

 get loginFormControl() {
  return this.loginForm.controls;
}
}