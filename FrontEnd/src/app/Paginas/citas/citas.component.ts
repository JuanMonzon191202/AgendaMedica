import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';
import { UsuariosService } from 'src/app/Services/Usuarios/usuarios.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
})
export class CitasComponent {
  public userData: any;
  public userDataCitas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private usuario: UsuariosService,
    public LoginService: LoginServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tokencio = localStorage.getItem('token');

    if (tokencio != null) {
      this.LoginService.scheduleTokenCheck();
    }

    if (tokencio === null) {
      this.alertService.ShowErrorAlert('Primero inicia sesión');
      this.router.navigate(['/login']);
    } else {
      const tokenRol = this.LoginService.getUserRole();
      console.log(tokenRol);

      if (tokenRol === 'Especialista' || tokenRol === 'Paciente') {
        this.getUserData();
        this.getUserCitas(tokenRol);
      } else {
        this.alertService.ShowErrorAlert(
          'No tienes permiso a esta vista (-.-)'
        );
        this.router.navigate(['/home']);
      }
    }
  }

  public cerrarsesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  private getUserData() {
    const tokenid = this.LoginService.getUserId();

    this.usuario.Usuario(tokenid).subscribe((res) => {
      this.userData = res;
      // console.log(res);
    });
  }
  getStatusStyle(status: string): { [key: string]: string } {
    let backgroundColor = 'grey'; // Color por defecto

    // Lógica para cambiar el color según el estado
    switch (status) {
      case 'Pendiente':
        backgroundColor = 'yellow';
        break;
      case 'Aceptado':
        backgroundColor = 'green';
        break;
      case 'Completa':
        backgroundColor = 'blue';
        break;
      case 'Cerrado':
        backgroundColor = 'red';
        break;
      // Agrega más casos según tus estados
    }

    return {
      'background-color': backgroundColor,
    };
  }
  getProfileLink(): string {
    const tokenRol = this.LoginService.getUserRole();
    const adminRoute = '/Admin-Dashboard';
    const userRoute = '/configuracion-cuenta';
    const especialistaRoute = '/configuracion-especialista';

    return tokenRol === 'Administrador'
      ? adminRoute
      : tokenRol === 'Especialista'
      ? especialistaRoute
      : userRoute;
  }

  private getUserCitas(tokenRol: string) {
    const tokenid = this.LoginService.getUserId();
    if (tokenRol === 'Especialista') {
      this.usuario.CitasEspecialistas(tokenid).subscribe(
        (res) => {
          console.log(res);

          this.userDataCitas = res.citas.$values;
          console.log(this.userDataCitas);

          this.alertService.showSuccess(res.message, '');
        },
        (error) => {
          if (error.status === 404) {
            this.alertService.ShowErrorAlert('No hay Citas :(');
          } else {
            console.log('Error en la llamada:', error);
          }
          console.log('Error en la llamada:', error);
        }
      );
    } else {
      this.usuario.CitasPacientes(tokenid).subscribe(
        (res) => {
          console.log(res);

          this.userDataCitas = res.citas.$values;
          console.log(this.userDataCitas);

          this.alertService.showSuccess(res.message, '');
        },
        (error) => {
          if (error.status === 404) {
            this.alertService.ShowErrorAlert('No hay Citas :(');
          } else {
            console.log('Error en la llamada:', error);
          }
          console.log('Error en la llamada:', error);
        }
      );
    }
  }
}
