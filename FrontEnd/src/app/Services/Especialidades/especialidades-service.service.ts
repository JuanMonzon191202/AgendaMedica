import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}
