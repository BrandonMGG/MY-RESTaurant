import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class ReservaService {
  apiUrl = environment.api;
  microservice = environment.microservice;
  
  constructor(private http: HttpClient) { }
  getReserva(data: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/reservacion?' + convertToUrlParams(data));
  }
  getMesas(): Observable<any> {
    return this.http.get<any>(this.microservice +'getMesas');
  }
  getHoras(): Observable<any> {
    return this.http.get<any>(this.microservice +'getHoras');
  }
  getReservas(): Observable<any> {  //Hay que pasar el cliente
    return this.http.get<any>('assets/reservaEdit.json');
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