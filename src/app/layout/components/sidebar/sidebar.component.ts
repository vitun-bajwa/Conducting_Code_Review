import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
currentUser: any;

constructor() {}

ngOnInit() {
  this.currentUser = sessionStorage.getItem('user');
  this.currentUser = JSON.parse(this.currentUser).userRole
}


}
