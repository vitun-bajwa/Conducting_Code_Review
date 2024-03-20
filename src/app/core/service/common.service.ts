import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
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
  
  successMSG(msg:string) {
    this.snackBar.open(msg,'',{
      duration: 3000, panelClass: ['snackbar-success']
    });
  }
  errorMSG(msg:string) { 
    this.snackBar.open(msg,'',{
      duration: 3000, panelClass: ['snackbar-error']
    });
  }

  warningMSG(msg:string) {
    this.snackBar.open(msg,'',{
      duration: 3000, panelClass: ['snackbar-warning']
    });
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<any>('http://localhost:3000/images', formData);
  }
 }
