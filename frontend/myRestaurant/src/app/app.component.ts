import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myRestaurant';
  isAdminReservaEnabled: boolean = false;

  constructor(private router: Router) { }

  isOnAdminPage(): boolean {
    if (this.router.url.includes('/adminreserva') || this.router.url.includes('/login')) {
      return false
    }
    if (this.router.url.includes('/adminreserva') || this.router.url.includes('/register')) {
      return false
    }
    if (this.router.url.includes('/adminreserva') || this.router.url.includes('/restablecer')) {
      return false
    }
    return true

  }

  isLinkEnabled(): boolean {
    return this.isAdminReservaEnabled; // Return true or false based on your condition
  }
  navigateToAdminReserva(): void {
    const role = localStorage.getItem('role');
    if (role === "admin") {
      this.verifyAdmin();
      this.isAdminReservaEnabled= true;
      this.router.navigate(['/adminreserva']);
    }
  }
  verifyAdmin(){
    if (this.isLinkEnabled()) {
      this.router.navigate(['/adminreserva']); 
    } else {
      // Handle the case where link is not enabled
      console.log('Link is not enabled');
    }
  }
}
