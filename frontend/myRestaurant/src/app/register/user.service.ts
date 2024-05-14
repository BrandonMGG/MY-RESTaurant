import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlapi=''
  constructor(private httclient:HttpClient) { }
  register(email:string,password:string){
    const userData={email,password};
    return this.httclient.post(`${this.urlapi}/register`,userData);
  }
}
