import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url='https://us-central1-proyect2soa.cloudfunctions.net/authServices' //url of servidor
  private Urlreset='https://us-central1-proyect2soa.cloudfunctions.net/authServices'
  constructor(private http:HttpClient) { }

  login(email:string, password:string):Observable<any>{
    console.log("todo bien")

    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    // Hacer solicitud GET con los parámetros
    console.log(params)
    return this.http.get<any>(`${this.url}/login`, { params:params });
    /*return this.http.post<any>(`${this.url}/login`,{email,password})*/
    
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.Urlreset}/send-password-reset-email`, { email });
  }
}
