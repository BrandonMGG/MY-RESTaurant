import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  apiUrl = environment.api;

  constructor(private http:HttpClient) { }
  getMenu(){
    return this.http.get<any>(this.apiUrl + 'api/backend')
  }
  getRecomendation(){
    return this.http.get<any>('/assets/recomendacion.json')
  }
  postFeedback(mensaje: any){
    return this.http.post<any>('/api/backend/feedback', mensaje)
  }
  
}
