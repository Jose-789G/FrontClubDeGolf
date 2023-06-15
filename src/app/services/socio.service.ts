import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socio } from '../models/socio';

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  url = 'http://localhost:8080/socios'

  constructor(private http: HttpClient) { }

  getSocios(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarSocio(id: string): Observable<any> {
    return this.http.delete(this.url + "/delete/" + id)
  }

  guardarSocio(socio: Socio): Observable<any> {
    return this.http.post(this.url + "/guardar", socio)
  }

  obtenerSocio(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarSocio(id: string, socio: Socio): Observable<any> {
    return this.http.put(this.url +"/update/"+ id, socio);
  }

  getInformeSocios(): Observable<any> {
    return this.http.get(this.url +"/generateReport");
  }
}