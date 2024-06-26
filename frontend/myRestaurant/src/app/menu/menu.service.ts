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
    return this.http.get<any>(this.apiUrl)
  }
  getRecomendation(comidas:any){
    return this.http.get<any>(this.apiUrl+'/menu?'+ convertToUrlParams(comidas))
  }
  postFeedback(mensaje: any){
    return this.http.get<any>(this.apiUrl+'/feedback?'+ convertToUrlParams(mensaje))
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
