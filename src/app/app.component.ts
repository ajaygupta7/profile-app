import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserAuthService } from './services/user-auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'analytics' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    // { title: 'Logout', url: '/login', icon: 'exit' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  // constructor() {}

  constructor(private storage: Storage, public userAuth:UserAuthService) {}

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    this.userAuth.fetchUsers();
    this.userAuth.getCurrentUser();
  }

  logout() {
    this.userAuth.logout();
  }
}
