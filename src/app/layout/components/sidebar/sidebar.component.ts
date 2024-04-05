import { Component } from '@angular/core';
import { commonEnum, getItem, routes } from 'src/app/core/enums/common.enum';
import { currentUser } from 'src/app/core/models/common-config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
  currentUser!: currentUser;
  commonEnum: typeof commonEnum = commonEnum;
  routes: typeof routes = routes;
  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
  }


}
