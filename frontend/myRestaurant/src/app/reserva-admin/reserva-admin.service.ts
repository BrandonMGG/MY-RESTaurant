import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReservaAdminService {
  apiUrl = environment.api;

  constructor(private http: HttpClient) { }
  
  getReservaAdmin(): Observable<any> {
    return this.http.get<any>('assets/reservaAdmin.json');
  }
}
