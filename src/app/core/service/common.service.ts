import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = environment.baseURL;
  users: any = []
  httpClient: any;
  constructor(public http: HttpClient) { }

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
//   patchdata(id:any,data:any){
//     return this.http.patch(this.baseUrl  data);
// }
  
}
