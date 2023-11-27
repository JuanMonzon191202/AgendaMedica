import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private usuario: UsuariosService,
    public LoginService: LoginServiceService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const tokencio = localStorage.getItem('token');
    const validityToken = this.LoginService.checkTokenValidity();

    if (tokencio != '') {
      this.LoginService.scheduleTokenCheck();
    }

    if (tokencio === '') {
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

  public async cerrarsesion() {
    const isConfirmed = await this.alertService.ShowConfirmationAlert(
      '¿Estás seguro de que quieres cerrar la sesión?',
      '',
      'Si',
      'Cancelar'
    );
    if (isConfirmed) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  private getUserData() {
    const tokenid = this.LoginService.getUserId();

    this.usuario.Usuario(tokenid).subscribe((res) => {
      this.userData = res;
      console.log(this.userData);

      const alerta = this.userData.isActive;

      if (alerta === false) {
        this.alertService.ShowConfirmationAlert(
          'Su cuenta no está activada',
          'Complete su información y consulte con soporte',
          'aceptar',
          'Salir'
        );
      }

      this.formulario.patchValue({
        Nombre: this.userData.nombre,
        Apellido: this.userData.apellido,
        Direccion: this.userData.especialistasCmc.$values[0].direccion,
        Ciudad: this.userData.especialistasCmc.$values[0].ciudad,
        Pais: this.userData.especialistasCmc.$values[0].pais,
        noCedula: this.userData.especialistasCmc.$values[0].noCedula,
        Descripcion: this.userData.especialistasCmc.$values[0].descripcion,
        Correo: this.userData.correo,
      });
    });
  }

  guardarCambios(): void {
    // Lógica para guardar cambios, incluyendo la contraseña si es necesario
    console.log('Guardando cambios...');
    console.log('Datos del formulario:', this.formulario.value);
  }

  private initForm(): void {
    this.formulario = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Direccion: ['', Validators.required],
      Ciudad: ['', Validators.required],
      Pais: ['', Validators.required],
      noCedula: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Correo: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }
  autoExpand(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
