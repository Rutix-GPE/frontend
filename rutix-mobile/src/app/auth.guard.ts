
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationTokenService } from 'src/core/http/services/authentication.service';
import { UserGlobales } from 'src/core/user-global/user-global';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user:any;
  constructor(private authService: AuthenticationTokenService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | boolean  {
      console.log("guard");
      if (!this.authService.getUserToken()) {
        this.router.navigate(['/login']);
        return false;
      }
      console.log("passe no IF");

      return true;
  }
}
