import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
@NgModule({
  imports: [
    MatSnackBarModule,
  ]
})
export class CommonService {
  baseUrl = environment.baseURL;
  users: any = []
  httpClient: any;
  constructor(public http: HttpClient, private snackBar: MatSnackBar) { }

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
  
  patchdata(url:any,data:any){
    return this.http.patch(this.baseUrl + url, data);
  }
  
  successMSG(msg:string) {
    this.snackBar.open(msg,'',{
      duration: 1000, panelClass: ['snackbar-success']
    });
  }
  errorMSG(msg:string) { 
    this.snackBar.open(msg,'',{
      duration: 1000, panelClass: ['snackbar-error']
    });
  }

  warningMSG(msg:string) {
    this.snackBar.open(msg,'',{
      duration: 1000, panelClass: ['snackbar-warning']
    });
  }
 }
