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

    const token = localStorage.getItem('token');

    if (token) {
      this.getCurrentUser().subscribe({
        next: (user) => {
          console.log(user);

          this.currentUserSubject.next(user);  // Mettre à jour l'utilisateur dans le BehaviorSubject
        },
        error: (err) => {
          console.error('Erreur lors du chargement de l\'utilisateur', err);
          this.logout();  // En cas d'échec, on supprime le token
        },
        complete: () => {
          console.log('Chargement de l\'utilisateur terminé');
        }
      });
    }
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
