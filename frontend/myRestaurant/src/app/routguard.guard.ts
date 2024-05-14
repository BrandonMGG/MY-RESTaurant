import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutguardGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(): boolean {
    const userRole = localStorage.getItem('role');
    if (userRole === 'admin') {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to login if user is not an admin
      return false;
    }
  }

}
