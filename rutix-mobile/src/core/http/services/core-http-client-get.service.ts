import { AuthenticationTokenService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreHttpHeaders } from './core-http-headers.service';
import { JsonLdGet } from '../json-ld-get.interface';
import { NovelArray } from '../novel-array.class';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class CoreHttpClientGet {
  public constructor(
    private http: HttpClient,
    private coreHttpHeaders: CoreHttpHeaders,
    public auth: AuthenticationTokenService
  ) {}

  list(url: string): Observable<any[]> {
    let headers = this.coreHttpHeaders.headers;
    headers = headers.append('Authorization', `Bearer ${this.auth.getUserToken()}`);
    return this.http.get<any[]>(environment.backend_url + url, {
      headers: headers,
    });
  }

  listNovelArray(novelArray: NovelArray, url: string): Observable<NovelArray> {
    return this.http.get<JsonLdGet>(environment.backend_url + url).pipe(
      map((data: JsonLdGet) => {
        novelArray.persist(data);
        return novelArray;
      })
    );
  }

  one(url: string): Observable<any> {
    let headers = this.coreHttpHeaders.headers;
    headers = headers.append('Authorization', `Bearer ${this.auth.getUserToken()}`);
    return this.http.get<any>(environment.backend_url + url, {
      headers: headers,
    });
  }
}
