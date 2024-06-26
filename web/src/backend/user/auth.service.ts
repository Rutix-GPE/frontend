import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { CoreHttpClientPost } from 'src/core/http/services/core-http-client-post.service';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor( private httpGet: CoreHttpClientGet,    private httpPost: CoreHttpClientPost) { }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.httpPost.postLogin('authenticate', { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.loadCurrentUser();
      })
    );
  }

  register(username: string, password: string): Observable<User> {
    return this.httpPost.postLogin('register', { username, password });
  }

  loadCurrentUser(): void {
    this.getCurrentUser().subscribe(user => this.currentUserSubject.next(user));
  }

  getCurrentUser(): Observable<User> {
    return this.httpGet.one('me');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.role === 'ROLE_ADMIN' : false;
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }
}
