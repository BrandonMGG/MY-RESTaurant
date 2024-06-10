import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class ReservaService {
  apiUrl = environment.api;
  microservice = environment.microservice;
  delete = environment.getResCliente
  constructor(private http: HttpClient) { }
  getReserva(data: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/reservacion?' + convertToUrlParams(data));
  }
  getMesas(): Observable<any> {
    return this.http.get<any>(environment.getMesas +'getMesas');
  }
  /*  getHoras(): Observable<any> {
    return this.http.get<any>(this.microservice +'getHoras');
  }*/
  getLocalidades(): Observable<any> {
    return this.http.get<any>(environment.getLocal+ 'getLocal')
  }
  getHoras(fecha: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(environment.getHours + 'getHours', fecha, { headers });
  }
  getReservas(cliente: any): Observable<any> {  //Hay que pasar el cliente
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.delete + 'getResCliente', cliente);
  }
  deleteReserva(id: any): Observable<any> {
    console.log(id)
    return this.http.get<any>(this.microservice + 'deleteReservation?id='+id);
  }
  makeReservation(data:any): Observable<any> {
    return this.http.post<any>(this.microservice + 'addReservation',data);
  }
  editReserva(data:any): Observable<any> {
    return this.http.get<any>(this.microservice + 'update', data);
  }
}

function convertToUrlParams(data: any): string {
  const params = new URLSearchParams();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      params.set(key, data[key]);
    }
  }
  return params.toString();
}