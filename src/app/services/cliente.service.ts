import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:9090/api/cliente/';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getAll(cedula): Observable<any> {
    let httpParams = new HttpParams();
    if(cedula){
      httpParams = httpParams.append("cedula", cedula.toString());      
    }
    return this.http.get(baseUrl,{params: httpParams});
  }

  checkCedula(cedula): Observable<any> {
    return this.http.get(`${baseUrl}/cedula/${cedula}`);
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
