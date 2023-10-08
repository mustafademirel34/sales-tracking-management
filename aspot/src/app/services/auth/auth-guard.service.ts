import { Injectable } from '@angular/core';
import { AuthCheckService } from './auth-check.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthCheckService, 
    private router: Router
  ) { 
    //this.authService.isAuthenticated()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      // Kullanıcı doğrulanmışsa true döndür
      return true;
    } else {
      // Kullanıcı doğrulanmamışsa login sayfasına yönlendir
      return this.router.createUrlTree(['/login']);
    }
  }
}
