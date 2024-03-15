import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getItem } from 'src/app/core/enums/common.enum';
import { currentUser } from 'src/app/core/models/common-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  currentUser!: currentUser;

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
    // this.currentUser = JSON.parse(this.currentUser)

  }

  logOut() {
    let token = sessionStorage.getItem(getItem.token);
    if(token) {
      sessionStorage.clear();
      this.router.navigateByUrl('/auth/login')
    }
  }
  changePassword() {
    
  }
}
