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
  selector: 'app-modal-roles',
  templateUrl: './modal-roles.component.html',
  styleUrls: ['./modal-roles.component.css'],
})
export class ModalRolesComponent {
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private especialidadService: EspecialidadesServiceService,
    public LoginService: LoginServiceService
  ) {}

  @Input() selectedRol: any;
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit();
  }

  async Update(): Promise<void> {
    const idEspecialidad = this.selectedRol.id;

    const RolData = {
      id: this.selectedRol.id,
      nombreRol: this.selectedRol.nombreRol,
    };

    const isConfirmed = await this.alertService.ShowConfirmationAlert(
      'Los datos se actualizarán',
      '¿Esta seguro?',
      'Actuaizar',
      'Cancelar'
    );
    if (isConfirmed) {
      this.especialidadService
        .updateRol(idEspecialidad, RolData)
        .subscribe((res) => {
          this.alertService.MinShowSucces('Correcto', res.message);
        });
      setTimeout(() => {
        location.reload();
      }, 1000);
      this.cerrarModal();
    } else {
      this.cerrarModal();
    }
  }
}
