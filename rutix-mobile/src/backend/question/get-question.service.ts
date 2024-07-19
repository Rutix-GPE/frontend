import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';

@Injectable({
  providedIn: 'root'
})
export class GetQuestionService {

  constructor(
    private httpGet: CoreHttpClientGet
  ) {}


  listAll(): Observable<any[]> {
    return this.httpGet.list('question');
  }
}
