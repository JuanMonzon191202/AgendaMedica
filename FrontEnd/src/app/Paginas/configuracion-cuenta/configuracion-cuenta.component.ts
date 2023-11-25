import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { UsuariosService } from 'src/app/Services/Usuarios/usuarios.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';

@Component({
  selector: 'app-configuracion-cuenta',
  templateUrl: './configuracion-cuenta.component.html',
  styleUrls: ['./configuracion-cuenta.component.css'],
})
export class ConfiguracionCuentaComponent {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  public userData: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private usuario: UsuariosService,
    private router: Router,
    public LoginService: LoginServiceService
  ) {}

  ngOnInit(): void {
    const tokencio = localStorage.getItem('token');
    const validityToken = this.LoginService.checkTokenValidity();
    if (tokencio != null) {
      this.LoginService.scheduleTokenCheck();
    }

    if (tokencio === null) {
      this.alertService.ShowErrorAlert('Primero inicia sesion');
      this.router.navigate(['/login']);
    } else {
      const tokenRol = this.LoginService.getUserRole();

      if (tokenRol === 'Paciente') {
        this.UserData();
      } else {
        this.alertService.ShowErrorAlert(
          'No tienes permiso a esta vista (-.-)'
        );
        this.router.navigate(['/home']);
      }
    }
    // }
  }
  public cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  private UserData() {
    const tokenid = this.LoginService.getUserId();

    this.usuario.Usuario(tokenid).subscribe((res) => {
      this.nombre = res.nombre;
      this.apellido = res.apellido;
      this.correo = res.email;
      this.userData = res;
      this.telefono = res.pacientes.$values[0].telefono;
      const alerta = this.userData.isActive;

      if (alerta === false) {
        this.alertService.ShowConfirmationAlert(
          'Su cuenta fue desactivada',
          'consulte con soporte',
          'aceptar',
          'Salir'
        );
      }
    });
  }
}
