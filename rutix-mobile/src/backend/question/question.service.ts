import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { Question } from './question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private httpGet: CoreHttpClientGet) {}

  listAll(): Observable<Question[]> {
    return this.httpGet.list('template-question/list');
  }

  getOne(id: number): Observable<Question> {
    return this.httpGet.one(`template-question/show/${id}`);
  }
}
