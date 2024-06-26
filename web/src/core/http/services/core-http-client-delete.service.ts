import { AuthenticationTokenService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoreHttpHeaders } from './core-http-headers.service';

@Injectable()
export class CoreHttpClientDelete {
  public constructor(
    private http: HttpClient,
    private coreHttpHeaders: CoreHttpHeaders,
    public auth: AuthenticationTokenService
  ) {}

  delete(url: string): Observable<any> {
    let headers = this.coreHttpHeaders.headers;
    headers = headers.append('Authorization', `Bearer ${this.auth.getUserToken()}`);
    return this.http.delete(environment.backend_url + url, {
      headers: headers,
    });
  }
}
