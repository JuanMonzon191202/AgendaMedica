import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../../environments/api-endpoints';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public Login(registro: FormGroup): Observable<any> {
    return this.http
      .post(`${this.apiUrl}${ApiEndpoints.auth.login}`, registro)
      .pipe(
        map((response: any) => {
          // console.log('Respuesta completa:', response);

          if (response != null && response.token && response.token.result) {
            const token = response.token.result;
            localStorage.setItem('token', token);

            // // Decodificar el token
            // const decodedToken = this.jwtHelper.decodeToken(token);

            // // Acceder a la información del token
            // const userId = decodedToken.nameid;
            // const userRole = decodedToken.role;

            // // Guardar la información en el almacenamiento local
            // localStorage.setItem('userId', userId);
            // localStorage.setItem('userRole', userRole);

            // console.log('Token recuperado:', token);
            // console.log('ID de usuario:', userId);
            // console.log('Rol de usuario:', userRole);
          }

          return response;
        })
      );
  }
  private getDecodedToken() {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  public getUserId(): number {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? +decodedToken.nameid : 0;
  }

  public getUserRole(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.role : '';
  }

  checkTokenValidity(): boolean {
    try {
      const decodedToken: any = this.getDecodedToken();
      //obtener la fecha y hora exacta en las que el token expira
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate > new Date();
    } catch (error) {
      console.error('Error decoding or checking token validity:', error);
      return false;
    }
  }
}
