import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  ngOnInit() {}

  logOut() {
    let token = sessionStorage.getItem('token');
    if(token) {
      sessionStorage.clear();
      this.router.navigateByUrl('/auth')
    }
  }

}
