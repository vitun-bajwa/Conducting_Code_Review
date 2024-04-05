import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { apiEndPoints, getItem, routes, tableEnum } from '../enums/common.enum';
import { currentUser } from '../models/common-config';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CommonService {
  baseUrl = environment.baseURL;
  users: any = []
  subscription = new Subscription();
  httpClient: any;
  currentUser!: currentUser;
  constructor(public http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.currentUser = JSON.parse(sessionStorage.getItem(getItem.user)!);
   }

  get(url: string, param?:string) {
    return this.http.get(this.baseUrl + url + (param ? param : ''));
  }

  add(url: string, data: object) {
    return this.http.post(this.baseUrl + url, data)
  }

  edit(url: string, data: object) {
    return this.http.put(this.baseUrl + url, data);
  }

  delete(url: string) {
    return this.http.delete(this.baseUrl + url);
  }
  
  successMSG(msg:string) {
    this.snackBar.open(msg,'',{
      duration: 3000, panelClass: ['snackbar-success']
    });
  }
  errorMSG(msg:string, duration?:number) { 
    this.snackBar.open(msg,'',{
      duration: duration ? duration : 3000, panelClass: ['snackbar-error']
    });
  }

  warningMSG(msg:string) {
    this.snackBar.open(msg,'',{
      duration: 3000, panelClass: ['snackbar-warning']
    });
  }

  isActive() {
    this.subscription.add(this.get(apiEndPoints.users).subscribe((res: any) => {
      let currentUser = res.find((item: any) => this.currentUser?.id === item.id)
      if (currentUser.status != tableEnum.Active) {
        sessionStorage.clear();
        this.router.navigateByUrl(routes.auth + routes.login);
      }
    }));
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

 }
