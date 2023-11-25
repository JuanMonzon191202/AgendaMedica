import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';
import { UsuariosService } from 'src/app/Services/Usuarios/usuarios.service';

@Component({
  selector: 'app-configuracion-cuenta-especialista',
  templateUrl: './configuracion-cuenta-especialista.component.html',
  styleUrls: ['./configuracion-cuenta-especialista.component.css'],
})
export class ConfiguracionCuentaEspecialistaComponent implements OnInit {
  public userData: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private usuario: UsuariosService,
    public LoginService: LoginServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tokencio = localStorage.getItem('token');
    const validityToken = this.LoginService.checkTokenValidity();

    if (tokencio != null) {
      this.LoginService.scheduleTokenCheck();
    }

    if (tokencio === null) {
      this.alertService.ShowErrorAlert('Primero inicia sesión');
      this.router.navigate(['/login']);
    } else {
      const tokenRol = this.LoginService.getUserRole();

      if (tokenRol === 'Especialista') {
        this.getUserData();
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
      const alerta = this.userData.isActive;
      
      if (alerta === false) {
        this.alertService.ShowConfirmationAlert(
          'Su cuenta no esta activada',
          'Complete su informacion y consulte con soporte',
          'aceptar',
          'Salir'
        );
      }
      // console.log(res);
    });
  }
}
