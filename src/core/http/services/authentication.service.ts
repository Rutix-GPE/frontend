// authentication.service.ts
import { Injectable } from '@angular/core';
import { User } from 'src/backend/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationTokenService {
  constructor() {
  }
  user!: User

  getUserToken(): string |null {
    const tokenLocalStorage = localStorage.getItem('token');
    if (tokenLocalStorage) {
        let token = tokenLocalStorage
        if(token) {
          return token;
        }
    }
    return null
  }
}
