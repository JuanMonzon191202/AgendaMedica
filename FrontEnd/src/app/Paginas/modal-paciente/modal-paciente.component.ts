import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { EspecialidadesServiceService } from 'src/app/Services/Especialidades/especialidades-service.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';
import { RegistroServiceService } from 'src/app/Services/Registro/registro-service.service';
import { UsuariosService } from 'src/app/Services/Usuarios/usuarios.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.component.html',
  styleUrls: ['./modal-paciente.component.css'],
})
export class ModalPacienteComponent {
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private userService: UsuariosService,
    private router: Router,
    public LoginService: LoginServiceService
  ) {}

  @Input() selectedUserPaciente: any;
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit();
  }

  async Update(): Promise<void> {
    const idUsuario = this.selectedUserPaciente.id;
    const usuarioData = {
      id: this.selectedUserPaciente.id,
      Nombre: this.selectedUserPaciente.nombre,
      Apellido: this.selectedUserPaciente.apellido,
      Email: this.selectedUserPaciente.email,
      Foto: '',
      Password: this.selectedUserPaciente.password,
      isActive: this.selectedUserPaciente.isActive,
      idRol: this.selectedUserPaciente.idRol,
    };
    console.log(usuarioData);

    const isConfirmed = await this.alertService.ShowConfirmationAlert(
      'Los datos se actualizarán',
      '¿Esta seguro?',
      'Actuaizar',
      'Cancelar'
    );
    if (isConfirmed) {
      this.userService.actualizarUsuario(idUsuario, usuarioData).subscribe(
        (response) => {
          console.log(response);

          console.log('Usuario actualizado con éxito:', response);
          this.alertService.showSuccess(
            'Usuario actualizado con éxito:',
            response.message
          );

          this.cerrarModal();
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      this.cerrarModal();
    }
  }
}
