import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl = environment.baseURL;
  users: any = []
  httpClient: any;
  baseURL: any;
  constructor(public http: HttpClient) { }

  senduserdata(data: any) {
    return this.http.post(this.apiUrl, data)
  }
  get() {
    return this.http.get(this.apiUrl);
  }
  getEmployeeById(id: number){
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
