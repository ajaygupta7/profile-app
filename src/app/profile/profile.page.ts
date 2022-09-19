import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( public userAuth:UserAuthService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.userAuth.getCurrentUser();
    // console.log('ajaja',this.userData);
    // this.userData = this.userAuth.currentUser
  }

}
