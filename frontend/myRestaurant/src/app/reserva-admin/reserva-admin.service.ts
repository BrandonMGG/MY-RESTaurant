import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReservaAdminService {
  apiUrl = environment.api;
  microservice = environment.microservice;

  constructor(private http: HttpClient) { }
  
  getReservaAdmin(): Observable<any> {
    return this.http.get<any>(this.microservice + 'getAllRes')
  }
  agregarHora(data:any): Observable<any> {
    return this.http.get<any>(this.microservice + 'addHours?fecha='+data["fecha"]+'&hora='+data["hora"]);
  }
   editReserva(data:any): Observable<any> {
    return this.http.get<any>(this.microservice + 'updateReservas?mesa='+data["mesa"]+'&personas='+data["personas"]+'&hora='+data["hora"]+'&fecha='+data["fecha"]+'&id='+data["id"]);
  }
  getAllReservations(): Observable<any> {
    return this.http.get<any>(this.microservice + 'getAllRes');
  }
  deleteReserva(id: any): Observable<any> {
    console.log(id)
    return this.http.get<any>(this.microservice + 'deleteReservation?id='+id);
  }
}
