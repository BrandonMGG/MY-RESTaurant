import { Injectable } from '@angular/core';
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


