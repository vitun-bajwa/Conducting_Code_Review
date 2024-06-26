import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { commonEnum, getItem, routes } from 'src/app/core/enums/common.enum';
import { currentUser } from 'src/app/core/models/common-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  currentUser!: currentUser;
  title: string = commonEnum.title;
  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
  }

  logOut() {
    let token = sessionStorage.getItem(getItem.token);
    if(token) {
      sessionStorage.clear();
      this.router.navigateByUrl(routes.auth + routes.login);
    }
  }
}
