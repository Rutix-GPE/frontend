import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CoreHttpHeaders {
  public headers: HttpHeaders;
  public headersLdGet: HttpHeaders;
  public headersPatch: HttpHeaders;
  public constructor() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });

    this.headersLdGet = new HttpHeaders({
      accept: 'application/ld+json',
    });
    this.headersPatch = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '  application/json',
    });
  }

  /*
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.



        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const jsonReq = req.clone({
          headers: req.headers.set('Content-Type',  'dsds')
        });


        // send cloned request with header to the next handler.
        return next.handle(jsonReq);
      }
*/
}
