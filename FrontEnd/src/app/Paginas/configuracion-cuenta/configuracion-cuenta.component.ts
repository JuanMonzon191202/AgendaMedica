import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { UsuariosService } from 'src/app/Services/Usuarios/usuarios.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';

@Component({
  selector: 'app-configuracion-cuenta',
  templateUrl: './configuracion-cuenta.component.html',
  styleUrls: ['./configuracion-cuenta.component.css'],
})
export class ConfiguracionCuentaComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  telefono: string = '';
  password: string = '';
  public userData: any;
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private usuario: UsuariosService,
    private router: Router,
    public LoginService: LoginServiceService
  ) {}

  ngOnInit(): void {
    this.initForm();
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

      if (tokenRol === 'Paciente') {
        this.UserData();
      } else {
        this.alertService.ShowErrorAlert(
          'No tienes permiso a esta vista (-.-)'
        );
        this.router.navigate(['/home']);
      }
    }
  }

  cerrarsesion(): void {
    this.alertService
      .ShowConfirmationAlert(
        '¿Estás seguro de que quieres cerrar la sesión?',
        '',
        'Si',
        'Cancelar'
      )
      .then((isConfirmed) => {
        if (isConfirmed) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
  }

  private UserData(): void {
    const tokenid = this.LoginService.getUserId();

    this.usuario.Usuario(tokenid).subscribe((res) => {
      this.nombre = res.nombre;
      this.apellido = res.apellido;
      this.correo = res.email;
      this.password = '';
      this.userData = res;
      this.telefono = res.pacientes.$values[0].telefono;
      const alerta = this.userData.isActive;
      const tokenid = this.LoginService.getUserId();
      this.formulario = this.fb.group({
        id: tokenid,
        Nombre: this.nombre,
        Apellido: this.apellido,
        Telefono: this.telefono,
        Password: '',
        Email: this.correo,
        Foto: ['dsvd'],
      });
      if (alerta === false) {
        this.alertService.ShowConfirmationAlert(
          'Su cuenta fue desactivada',
          'Consulte con soporte',
          'Aceptar',
          'Salir'
        );
      }
    });
  }

  async guardarCambios(): Promise<void> {
    const isConfirmed = await this.alertService.ShowConfirmationAlert(
      '¿Estás seguro de que quieres actualizar sus datos?',
      '',
      'Si',
      'Cancelar'
    );
    if (isConfirmed) {
      const tokenid = this.LoginService.getUserId();
      if (this.formulario.valid) {
        this.usuario.UpdateUsuario(tokenid, this.formulario.value).subscribe(
          (res) => {
            console.log('Respuesta del servidor:', res);
            if (res.message) {
              this.alertService.MinShowSucces(res.message, '!Correcto¡');

              // Esperar 3 segundos antes de recargar la página
              setTimeout(() => {
                location.reload();
              }, 3000);
            }
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
          }
        );
        console.log('Guardando cambios...');
        console.log('Datos del formulario:', this.formulario.value);
      }
    }
  }

  private getErrorMessage(errors: any): string {
    // Convierte el objeto de errores a una cadena de mensajes
    const errorMessages = Object.keys(errors).map((key) => {
      return `${key}: ${errors[key].join(', ')}`;
    });

    return errorMessages.join('\n');
  }

  private initForm(): void {
    this.formulario = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: '',
    });
  }
}
