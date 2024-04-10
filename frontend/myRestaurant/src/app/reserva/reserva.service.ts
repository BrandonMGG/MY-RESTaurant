import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  getReserva(data: any){
    return this.http.post<any>('/api/backend/reservacion', data);
  }
}

