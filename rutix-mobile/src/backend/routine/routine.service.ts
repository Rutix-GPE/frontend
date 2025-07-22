import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  constructor(private httpGet: CoreHttpClientGet) {}

  listRoutinesByUser(): Observable<any[]> {
    return this.httpGet.list('routine/v2/get-by-user');
  }
}
