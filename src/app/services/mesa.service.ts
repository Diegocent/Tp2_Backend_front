import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:9090/api/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private http: HttpClient) { }

  getAll(idRestaurante, mesas): Observable<any> {
    let httpParams = new HttpParams();
    if(idRestaurante){
      httpParams = httpParams.append("restaurante", idRestaurante.toString());      
    }
    if(mesas){
      mesas.forEach(mesa => {
        httpParams = httpParams.append("mesas", mesa.toString());
      });
    }
    return this.http.get(baseUrl,{params: httpParams});
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findAll(nombre): Observable<any> {
    return this.http.get(`${baseUrl}?nombre=${nombre}`);
  }
}
