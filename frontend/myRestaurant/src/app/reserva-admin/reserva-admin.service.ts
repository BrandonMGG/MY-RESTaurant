import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReservaAdminService {

  constructor(private http: HttpClient) { }
  getReservaAdmin(): Observable<any> {
    return this.http.get<any>('assets/reservaAdmin.json');
  }
}
