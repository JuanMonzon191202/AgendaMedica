import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiEndpoints } from '../../../environments/api-endpoints';
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
}
