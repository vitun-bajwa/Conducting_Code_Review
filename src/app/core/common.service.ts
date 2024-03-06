import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = 'http://localhost:3000/users';
  users: any = []
  httpClient: any;
  baseURL: any;
  constructor(public http: HttpClient) { }

  loginData(data: any) {
    return this.http.get(this.apiUrl, data);
  }

  getUserData(){
    return this.http.get(this.apiUrl)
  }
}
