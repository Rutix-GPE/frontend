import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { CoreHttpClientPost } from 'src/core/http/services/core-http-client-post.service';
import { Response } from './response.interface';  // Import de l'interface

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  constructor(
    private httpGet: CoreHttpClientGet,
    private httpPost: CoreHttpClientPost
  ) {}

  // Récupérer toutes les réponses d'un utilisateur
  getUserResponses(): Observable<Response[]> {
    return this.httpGet.list(`user-response/list`); // Pas besoin de type argument ici
  }

  // Ajouter ou mettre à jour une réponse
  saveResponse(questionId: number, responseData: Response): Observable<any> {
    return this.httpPost.post(`user-response/new/${questionId}`, responseData);
  }

     // Récupérer une réponse d'un utilisateur pour une question donnée
  getUserResponse(userId: number, questionId: number): Observable<Response> {
    return this.httpGet.one(`response/user/${userId}/question/${questionId}`);
  }

}
