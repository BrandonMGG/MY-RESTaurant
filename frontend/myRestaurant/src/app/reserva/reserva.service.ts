import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  getReserva(data: any): Observable<any>{
    console.log("service", data);
    return this.http.post<any>('/api/backend/reservacion', data);
  }
}

