import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpClientDelete } from 'src/core/http/services/core-http-client-delete.service';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { CoreHttpClientPatch } from 'src/core/http/services/core-http-client-patch.service';
import { CoreHttpClientPost } from 'src/core/http/services/core-http-client-post.service';
import { User } from './user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpGet: CoreHttpClientGet,
    private httpPost: CoreHttpClientPost,
    private httpPatch: CoreHttpClientPatch,
    private httpDelete: CoreHttpClientDelete
  ) {}
  private _notificationsActive: boolean = false;
  private _presentationMode: boolean = false;

  // Getter setter pour notificationsActive
  get notificationsActive(): boolean {
    return this._notificationsActive;
  }
  set notificationsActive(value: boolean) {
    this._notificationsActive = value;
  }

  // Getter setter pour presentationMode
  get presentationMode(): boolean {
    return this._presentationMode;
  }
  set presentationMode(value: boolean) {
    this._presentationMode = value;
  }

  listAll(): Observable<User[]> {
    return this.httpGet.list('user');
  }

  getOne(id: number): Observable<User> {
    return this.httpGet.one(`user/${id}`);
  }

  update(user: User): Observable<User> {
    return this.httpPatch.patch(`user/${user.id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.httpDelete.delete(`user/${id}`);
  }

  updateMemo(memo: string): Observable<any> {
    return this.httpPatch.patch(`user/update-memo`, {memo: memo});
  }
}
