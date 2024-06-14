import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(): boolean {

    const isAuthenticated = this.cookieService.get('user') 

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false; 
    }
  }


}