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
  public UpdateUsuario(tokenid: number, formdata: FormGroup): Observable<any> {
    console.log(formdata);

    const url = `${this.apiUrl}${ApiEndpoints.usuario.updateUsuario}/${tokenid}`;
    return this.http.put(url, formdata, { headers: this.headers });
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
      registro,
      { headers: this.headers }
    );
  }
  public ListaUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}${ApiEndpoints.usuario.getUsuarios}`, {
      headers: this.headers,
    });
  }
  public ListarEspecialistas1(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${ApiEndpoints.usuario.usuariosEspecialistas}`,
      { headers: this.headers }
    );
  }
  public ListarPacientes(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${ApiEndpoints.usuario.usuariosPaciente}`,
      { headers: this.headers }
    );
  }
  public ListarEspecialistasNon(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${ApiEndpoints.especialistaCmc.getEspecialistasNon}`,
      { headers: this.headers }
    );
  }
  public actualizarUsuario(id: string, usuarioData: any): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.usuario.updateUsuario}/${id}`;
    console.log('servicio user datas', usuarioData);

    return this.http.put(url, usuarioData, { headers: this.headers });
  }
  public ListarEspecialistas(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}${ApiEndpoints.especialistaCmc.getEspecialistas}`,
      { headers: this.headers }
    );
  }
  public actualizarPaciente(id: string, usuarioData: any): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.paciente.updatePaciente}${id}`;
    console.log('servicio user datas', usuarioData);
    console.log(url);

    return this.http.put(url, usuarioData, { headers: this.headers });
  }

  public actualizarEspecialista(
    id: number,
    formdata: FormGroup
  ): Observable<any> {
    const url = `${this.apiUrl}${ApiEndpoints.especialistaCmc.updateEspecialista}${id}`;
    console.log(url);
    console.log(formdata);

    return this.http.put(url, formdata, { headers: this.headers });
  }
}
// public UpdateUsuario(tokenid: number, formdata: FormGroup): Observable<any> {
//     console.log(formdata);

//     const url = `${this.apiUrl}${ApiEndpoints.usuario.updateUsuario}/${tokenid}`;
//     return this.http.put(url, formdata, { headers: this.headers });
//   }
