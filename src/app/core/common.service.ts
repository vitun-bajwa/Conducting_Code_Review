import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = 'http://localhost:3000/users';
  users: any = []
  httpClient: any;
  baseURL: any;
  constructor(public http: HttpClient) { }

  senduserdata(data: any) {
    return this.http.post(this.apiUrl, data)
  }
}
