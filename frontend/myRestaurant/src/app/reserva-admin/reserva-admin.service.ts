import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReservaAdminService {
  apiUrl = environment.api;
  microservice = environment.microservice;
  delete = environment.getResCliente

  constructor(private http: HttpClient) { }
  
  getReservaAdmin(): Observable<any> {
    return this.http.get<any>(this.microservice + 'getAllRes')
  }
  getLocalidades(): Observable<any> {
    return this.http.get<any>(this.microservice + 'getLocal')
  }
  agregarHora(data:any): Observable<any> {
    return this.http.post<any>(this.microservice + 'addHours', data);
  }
   editReserva(data:any): Observable<any> {
    return this.http.put<any>(this.microservice + 'update', data);
  }
  getAllReservations(): Observable<any> {
    return this.http.get<any>(this.microservice + 'getAllRes');
  }
  deleteReserva(id: any): Observable<any> {
    console.log(id)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(this.delete + 'delete', { headers: headers, body:id });
  }
}
