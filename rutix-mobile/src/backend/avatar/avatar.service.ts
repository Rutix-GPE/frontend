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
      .list('avatar/list')  // renvoie Observable<string[]>
      .pipe(
        map((paths: string[]) =>
          paths.map(path =>
            // si le chemin commence par "/", on l'enlève, sinon on le laisse tel quel
            path.startsWith('/')
              ? path.substring(1)
              : path
          )
        )
      );
  }


  updateAvatar(fileName: string): Observable<any> {
    return this.httpPatch.patch('user/update-avatar',{avatar:fileName});
  }

}
