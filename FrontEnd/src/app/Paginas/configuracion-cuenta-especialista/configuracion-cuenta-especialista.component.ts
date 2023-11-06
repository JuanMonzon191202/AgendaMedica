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
    if (tokencio === null) {
      this.router.navigate(['/login']);
    } else {
      const tokenRol = this.LoginService.getUserRole();

      if (tokenRol === 'Especialista') {
        this.getUserData();
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
  public cerrarSesion() {
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
}
