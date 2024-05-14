import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url='' //url of servidor
  private Urlreset=''
  constructor(private http:HttpClient) { }

  login(email:string, password:string):Observable<any>{
    return this.http.post<any>(`${this.url}/login`,{email,password})
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.Urlreset}/send-password-reset-email`, { email });
  }
}
