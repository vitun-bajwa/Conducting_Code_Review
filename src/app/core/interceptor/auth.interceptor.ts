import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getItem } from '../enums/common.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = sessionStorage.getItem(getItem.token);
    //uncomment the code when integrating API's

        // if (userToken) {
        //     request = request.clone({
        //         setHeaders: {Authorization: `Bearer ${userToken}`}
        //     });
        // }
    return next.handle(request);
  }
}
