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
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.checkToken();
  }

  private checkToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.setAuthorizationHeader(token);
    }
  }

  private setAuthorizationHeader(token: string): void {
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  public EspecialidadXespecialista(id: number): Observable<any> {
    const url = `${
      this.apiUrl
    }${ApiEndpoints.especialidadEspecialista.getEspecialidadEspecialistaById(
      id
    )}`;
    return this.http.get(url, { headers: this.headers });
  }

  public createRoles(Data: any): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.rol.createRol}`;

    return this.http.post(url, Data, { headers: this.headers });
  }

  public listaRoles(): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.rol.getRoles}`;

    return this.http.get(url, { headers: this.headers });
  }
  public updateRol(id: number, Data: any): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.rol.updateRol(id)}`;
    return this.http.put(url, Data, { headers: this.headers });
  }

  public Especialidades(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${ApiEndpoints.especialidad.getEspecialidades}`
    );
  }

  public updateEspecialiad(id: number, Data: any): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.especialidad.updateEspecialidad(
      id
    )}`;

    return this.http.put(url, Data, { headers: this.headers });
  }

  public createEspecialidad(Data: any): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.especialidad.createEspecialidad}`;

    return this.http.post(url, Data, { headers: this.headers });
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

  public especialistaInfo(id?: number): Observable<any> {
    let params = new HttpParams();
    // console.log('el especialista llego con', id);

    if (id) {
      params = params.set('id', id.toString());
    }

    // const url = `${this.apiUrl}/api/EspecialistaCmc/especialistas/${id}`;
    const url = `${this.apiUrl}${ApiEndpoints.especialistaCmc.getEspecialistaById}${id}`;

    return this.http.get(url, { params: params });
  }
}
