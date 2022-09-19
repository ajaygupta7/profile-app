import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginForm = {
    email:'',
    password:''
  };
  constructor(private userAuth:UserAuthService) { }
 
  ngOnInit() {
  }
 
  login(){
    this.userAuth.useLogin(this.loginForm)
    .subscribe(value => {
      console.log('value: ', value);
      if(value){
        alert('login success');
      }
      else{
        alert('login fails')
      }
    },error => {
      alert('login fails')
    })
 }

}
