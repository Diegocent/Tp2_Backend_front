import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:9090/api/detalle_consumo'

@Injectable({
  providedIn: 'root'
})
export class Detalle_consumoService {

  constructor(private http: HttpClient) { }

  getAll(idCabecera): Observable<any> {

    return this.http.get(`${baseUrl}/?CabeceraConsumo=${idCabecera}`, {});
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
}
