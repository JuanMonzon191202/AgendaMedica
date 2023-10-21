// registro-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../../environments/api-endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegistroServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public Crear(registro: FormGroup): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${ApiEndpoints.usuario.createUsuario}`,
      registro
    );
  }
}
