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
  // loginForm = {
  //   email:'',
  //   password:''
  // };
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
    var a: any;
    if (this.userAuth.usersData.length <= 0){
      a = this.userAuth.fetchUsers().then((data)=> {
        console.log('in login Init', data);
      });
    } 
    // if (a) {}
    // this.userAuth.login(this.loginForm)
    this.userAuth.useLogin(this.loginForm.value)
    .subscribe(value => {
      console.log('value: ', value);
      if(value){
        // alert('login success');
        this.router.navigateByUrl("/dashboard");
        this.userAuth.getCurrentUser();
      } else{
        alert('login fails')
      }
    },(error) => {
      console.log('ajay testt error:', error);
      // alert('login fails')
    })
 }

 get loginFormControl() {
  return this.loginForm.controls;
}
​
}