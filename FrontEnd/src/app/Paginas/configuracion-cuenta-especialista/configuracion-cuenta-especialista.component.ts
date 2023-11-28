import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';
import { UsuariosService } from 'src/app/Services/Usuarios/usuarios.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-configuracion-cuenta-especialista',
  templateUrl: './configuracion-cuenta-especialista.component.html',
  styleUrls: ['./configuracion-cuenta-especialista.component.css'],
})
export class ConfiguracionCuentaEspecialistaComponent implements OnInit {
  public userData: any;
  formulario!: FormGroup;
  formularioESP!: FormGroup;
  idEspecialista: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private usuario: UsuariosService,
    public LoginService: LoginServiceService,
    private router: Router
  ) {
    this.initForm();
    this.initFormESP();
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
    console.log(tokenid);

    // let idEspecialista = '';
    this.usuario.Usuario(tokenid).subscribe((res) => {
      this.userData = res;
      console.log(this.userData);
      this.idEspecialista = this.userData.especialistasCmc.$values[0].id;
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
        id: tokenid,
        Nombre: this.userData.nombre,
        Apellido: this.userData.apellido,
        Direccion: this.userData.especialistasCmc.$values[0].direccion,
        Ciudad: this.userData.especialistasCmc.$values[0].ciudad,
        Pais: this.userData.especialistasCmc.$values[0].pais,
        noCedula: this.userData.especialistasCmc.$values[0].noCedula,
        Descripcion: this.userData.especialistasCmc.$values[0].descripcion,
        Foto: '',
        Email: this.userData.email,
      });
      console.log(this.userData.email);

      this.formularioESP.patchValue({
        id: this.idEspecialista,
        Direccion: this.userData.especialistasCmc.$values[0].direccion,
        Ciudad: this.userData.especialistasCmc.$values[0].ciudad,
        Pais: this.userData.especialistasCmc.$values[0].pais,
        noCedula: this.userData.especialistasCmc.$values[0].noCedula,
        Descripcion: this.userData.especialistasCmc.$values[0].descripcion,
      });
      console.log(this.formularioESP);
      console.log(this.formulario);
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
        const updateUsuario$ = this.usuario.UpdateUsuario(
          tokenid,
          this.formulario.value
        );
        const updateEspecialista$ = this.usuario.actualizarEspecialista(
          this.idEspecialista,
          this.formularioESP.value
        );

        forkJoin([updateUsuario$, updateEspecialista$]).subscribe(
          ([resUsuario, resPaciente]) => {
            console.log('Respuesta del servidor (Usuario):', resUsuario);
            console.log('Respuesta del servidor (Especialista):', resPaciente);

            // Realiza acciones adicionales después de completar ambas solicitudes
            this.alertService.MinShowSucces('¡Correcto!', resPaciente.message);
            // Esperar 3 segundos antes de recargar la página
            setTimeout(() => {
              location.reload();
            }, 3000);
          },
          (error) => {
            console.error('Error al actualizar usuario o paciente:', error);
          }
        );
      }
    }
    console.log('Guardando cambios...');
    console.log('Datos del formulario:', this.formulario.value);
  }

  private initForm(): void {
    this.formulario = this.fb.group({
      id: '',
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Direccion: ['', Validators.required],
      Ciudad: ['', Validators.required],
      Pais: ['', Validators.required],
      noCedula: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Email: [''],
      Foto: '',
      Password: '',
    });
  }
  private initFormESP(): void {
    this.formularioESP = this.fb.group({
      id: ['', Validators.required],
      Direccion: ['', Validators.required],
      Ciudad: ['', Validators.required],
      Pais: ['', Validators.required],
      noCedula: ['', Validators.required],
      Descripcion: ['', Validators.required],
    });
  }
  autoExpand(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
