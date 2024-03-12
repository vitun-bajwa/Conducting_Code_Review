import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  currentUser:any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('user');
    this.currentUser = JSON.parse(this.currentUser)
  }

  logOut() {
    let token = sessionStorage.getItem('token');
    if(token) {
      sessionStorage.clear();
      this.router.navigateByUrl('/auth/login')
    }
  }
  changePassword() {
    
  }
}
