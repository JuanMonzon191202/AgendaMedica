import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '../../../environments/api-endpoints';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
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

  public Usuario(tokenid: number): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.usuario.getUsuarioById(tokenid)}`;
    return this.http.get(url, { headers: this.headers });
  }
  public CitasPacientes(tokenid: number): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.cita.getCitasByUser(tokenid)}`;
    return this.http.get(url, { headers: this.headers });
  }
  public CitasEspecialistas(tokenid: number): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.cita.getCitasByEspecialista(
      tokenid
    )}`;
    return this.http.get(url, { headers: this.headers });
  }

  public Crear(registro: FormGroup): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${ApiEndpoints.usuario.createUsuario}`,
      registro
    );
  }

  public crearEspecialista(registro: FormGroup): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${ApiEndpoints.especialistaCmc.createEspecialista}`,
      registro
    );
  }
  public crearPaciente(registro: FormGroup): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${ApiEndpoints.paciente.createPaciente}`,
      registro, { headers: this.headers }
    );
  }
}
