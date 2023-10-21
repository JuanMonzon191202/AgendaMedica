import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../../environments/api-endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public Login(registro: FormGroup): Observable<any> {
    return this.http.post(`${this.apiUrl}${ApiEndpoints.auth.login}`, registro);
  }
}
