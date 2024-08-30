import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { CoreHttpClientPost } from 'src/core/http/services/core-http-client-post.service';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(
    private httpGet: CoreHttpClientGet,
    private httpPost: CoreHttpClientPost
  ) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.httpPost.postLogin('user/authenticate', { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.loadCurrentUser();
      })
    );
  }

  register(formData: any): Observable<User> {
    const registerData = {
      username: formData.username,
      password: formData.password,
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      numberphone: formData.phonenumber,
      country: formData.country,
      postalcode: formData.postalcode,
      city: formData.city,
      adress: formData.adress
    };
    return this.httpPost.postLogin('user/register', registerData);
  }

  loadCurrentUser(): void {
    this.getCurrentUser().subscribe(user => this.currentUserSubject.next(user));
  }

  getCurrentUser(): Observable<User> {
    return this.httpGet.one('user/me');
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
