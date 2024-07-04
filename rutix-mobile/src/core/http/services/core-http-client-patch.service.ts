import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoreHttpHeaders } from './core-http-headers.service';
import { AuthenticationTokenService } from './authentication.service';

@Injectable()
export class CoreHttpClientPatch {
  public constructor(
    private http: HttpClient,
    private coreHttpHeaders: CoreHttpHeaders,
    public auth: AuthenticationTokenService
  ) {}

  patch(url: string, data: any | null): Observable<any> {
    let headers = this.coreHttpHeaders.headersPatch;
    headers = headers.append('Authorization', `Bearer ${this.auth.getUserToken()}`);
    return this.http.patch<any>(environment.backend_url + url, data, {
      headers: headers,
    });
  }
}
