import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { Question } from './question.interface';
import { CoreHttpClientPost } from 'src/core/http/services/core-http-client-post.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(
    private httpGet: CoreHttpClientGet,
    private httpPost: CoreHttpClientPost
  ) {}

  listAll(): Observable<Question[]> {
    return this.httpGet.list('template-question/list');
  }

  getOne(id: number): Observable<Question> {
    return this.httpGet.one(`template-question/show/${id}`);
  }

  newResponses(questionId: number, responseData: any): Observable<any> {
    return this.httpPost.post(`user-response/new/${questionId}`, responseData);
  }

  getFirstQuestion(): Observable<any> {
    return this.httpGet.one('user-response/v2/first-question');
  }

  getNextQuestion(url: string, answer: string): Observable<any> {
    const questionId = url.split('/').pop();
    return this.httpPost.post(`user-response/v2/next-question/${questionId}`, { answer });
  }
}
