import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myRestaurant';

  constructor(private router: Router) {}

  isOnAdminPage(): boolean {
    if(this.router.url.includes('/adminreserva') || this.router.url.includes('/login') ){
      return false
    }
     if(this.router.url.includes('/adminreserva') || this.router.url.includes('/register') ){
      return false
    }
    return true
    
  }
}
