import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../categorie/categorie.service";
import {CoreHttpClientGet} from "../../core/http/services/core-http-client-get.service";
import {CoreHttpClientPost} from "../../core/http/services/core-http-client-post.service";
import {CoreHttpClientDelete} from "../../core/http/services/core-http-client-delete.service";
import {CoreHttpClientPatch} from "../../core/http/services/core-http-client-patch.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private httpGet: CoreHttpClientGet,
    private httpPost: CoreHttpClientPost,
    private httpDelete: CoreHttpClientDelete,
    private httpPatch: CoreHttpClientPatch
  ) { }

  list(): Observable<string[]> {
    return this.httpGet
      .list('avatar/list')
      .pipe(
        map((response: any) => {
          // Vérifier si la réponse est un tableau
          if (!Array.isArray(response)) {
            // Si ce n'est pas un tableau, essayer de convertir la réponse en tableau
            if (typeof response === 'string') {
              return [response];
            } else if (response && typeof response === 'object') {
              // Si c'est un objet, essayer d'extraire les chemins
              return Object.values(response);
            }
            // Si on ne peut pas convertir, retourner un tableau vide
            return [];
          }
          
          // Si c'est déjà un tableau, le traiter normalement
          return response.map((path: string) =>
            path.startsWith('/') ? path.substring(1) : path
          );
        })
      );
  }

  updateAvatar(fileName: string): Observable<any> {
    return this.httpPatch.patch('user/update-avatar',{avatar:fileName});
  }
}
