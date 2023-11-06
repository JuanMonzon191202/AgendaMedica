import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '../../../environments/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadesServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public Especialidades(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${ApiEndpoints.especialidad.getEspecialidades}`
    );
  }
  public Especialistas(
    idEspecialidad?: number,
    estado?: string
  ): Observable<any> {
    // Construye los parámetros
    let params = new HttpParams();

    if (idEspecialidad) {
      params = params.set('idEspecialidad', idEspecialidad.toString());
    }

    if (estado) {
      params = params.set('estado', estado);
    }

    // Asegúrate de que la URL esté construida correctamente
    const url = `${this.apiUrl}/api/EspecialistaCmc/especialidad/${idEspecialidad}/estado/${estado}`;

    // Agrega los parámetros a la solicitud
    return this.http.get(url, { params: params });
  }
}
