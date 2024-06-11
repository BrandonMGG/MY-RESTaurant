import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Urlreset = 'http:localhost:4000/auth/'
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log("todo bien")
    const data = {
      username: email,
      password: password
    };
    // Hacer solicitud GET con los parámetros
    console.log(data)
    return this.http.post<any>(environment.auth + 'login', data);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(environment.auth + 'forgotPassword', {email});
  }
}
