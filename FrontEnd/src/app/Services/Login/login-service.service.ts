import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../../environments/api-endpoints';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from '../AlerServices/alert.service';
@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  private apiUrl = environment.apiUrl;
  private checkInterval: number = 15000; // Verificar cada .5 minuto

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private Alertas: AlertService
  ) {
    const token = localStorage.getItem('token');

    if (token != null) {
      this.scheduleTokenCheck();
      // console.log('inicia refreshToken');
    } else {
      // console.log('no inicia refreshToken');
    }
  }

  public Login(registro: FormGroup): Observable<any> {
    return this.http
      .post(`${this.apiUrl}${ApiEndpoints.auth.login}`, registro)
      .pipe(
        map((response: any) => {
          // console.log('Respuesta completa:', response);

          if (response != null && response.token && response.token.result) {
            const token = response.token.result;

            localStorage.setItem('token', token);
          }

          return response;
        })
      );
  }

  public scheduleTokenCheck(): void {
    setInterval(() => {
      this.checkTokenAndRefreshIfNeeded();
    }, this.checkInterval);
  }

  private async checkTokenAndRefreshIfNeeded(): Promise<void> {
    const isValid = this.checkTokenValidity();
    const token = localStorage.getItem('token');
    if (token) {
      if (!isValid) {
        // El token está cerca de expirar o ya expiró, refrescarlo
        console.log('El token está cerca de expirar o ya expiró, refrescar');
        const isConfirmed = await this.Alertas.ShowConfirmationAlert(
          'La sesión está cerca de expirar o ya expiró, renovar?',
          'Si no se renueva la sesión no podrá seguir con sus actividades',
          'Renovar',
          'Salir'
        );
        if (isConfirmed) {
          // Código para manejar la confirmación
          this.refreshToken();
        } else {
          // Código para manejar la cancelación
          localStorage.removeItem('token');

          this.Alertas.ShowErrorAlert('Sesión no renovada');
          window.location.reload();
        }
      }
    }
  }

  private refreshToken(): void {
    // Lógica para refrescar el token

    const token = localStorage.getItem('token');
    const URL = `${this.apiUrl}${ApiEndpoints.auth.refresh}/`;
    console.log(URL);
    const json = {
      refreshToken: token,
    };

    this.http.post(URL, json).subscribe(
      async (response: any) => {
        console.log('Respuesta completa:', response);

        const token = response.accessToken;

        if (token) {
          localStorage.setItem('token', token);
          this.Alertas.MinShowSucces('Sesion renovada');
        }
      },
      (error) => {
        // Manejar errores si es necesario
        console.error(
          'Error en la solicitud de actualización de token:',
          error
        );
      }
    );

    console.log('Refreshing token...');
    // Implementa la lógica de renovación del token aquí
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
    const token = localStorage.getItem('token');
    if (token) {
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
    return false;
  }
}
