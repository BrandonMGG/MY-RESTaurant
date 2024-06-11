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
    return this.http.get<any>(environment.api + 'getAllRes/getAllRes')
  }
  getLocalidades(): Observable<any> {
    return this.http.get<any>(environment.api + 'getLocal/getLocal')
  }
  agregarHora(data:any): Observable<any> {
    return this.http.post<any>(environment.api + 'addHours/addHours', data);
  }
   editReserva(data:any): Observable<any> {
    return this.http.put<any>(environment.api + 'updateRes/update', data);
  }
  getAllReservations(): Observable<any> {
    return this.http.get<any>(environment.api + 'getAllRes/getAllRes');
  }
  deleteReserva(id: any): Observable<any> {
    console.log(id)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(environment.api + 'delRes/delete', { headers: headers, body:id });
  }
}
