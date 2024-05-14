/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlapi='http://localhost:8080/'
  constructor(private httclient:HttpClient) { }
  register(email:string,password:string, confirm:string):Observable<any>{
   
    const userData={email,password,confirm};
    console.log(userData)
    return this.httclient.post<any>('http://localhost:8080/register',userData);
  }
}
*/


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://us-central1-proyect2soa.cloudfunctions.net/authServices';

  constructor(private httpClient: HttpClient) { }

  register(email: string, password: string, confirm: string): Observable<any> {
    // Crear un objeto HttpParams para pasar los parámetros en la URL
    let params = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('confirm', confirm);
    console.log(params)
    // Realizar la solicitud GET con los parámetros en la URL
    return this.httpClient.get<any>(`${this.url}/register`, { params: params });
  }
}


