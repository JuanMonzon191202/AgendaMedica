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
    this.UserData();
  }

  private UserData() {
    const tokenid = this.LoginService.getUserId();

    this.usuario.Usuario(tokenid).subscribe((res) => {
      this.nombre = res.nombre;
      this.apellido = res.apellido;
      this.correo = res.email;
      this.userData = res;
      this.telefono = res.pacientes.$values[0].telefono;
      // console.log(res.especialistasCmc.$values.noCedula);res.especialistasCmc.$values[0].noCedula
      // console.log(res);
    });
  }
}
