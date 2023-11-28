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
  selector: 'app-modal-especialidades',
  templateUrl: './modal-especialidades.component.html',
  styleUrls: ['./modal-especialidades.component.css'],
})
export class ModalEspecialidadesComponent {
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private userService: UsuariosService,
    private especialidadService: EspecialidadesServiceService,
    public LoginService: LoginServiceService
  ) {}

  @Input() selectedEspecialiad: any;
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit();
  }

  async Update(): Promise<void> {
    const idEspecialidad = this.selectedEspecialiad.id;
    console.log(this.selectedEspecialiad);

    const especialiadData = {
      id: this.selectedEspecialiad.id,
      nombreEspecialidad: this.selectedEspecialiad.nombreEspecialidad,
    };
    console.log(especialiadData);

    const isConfirmed = await this.alertService.ShowConfirmationAlert(
      'Los datos se actualizarán',
      '¿Esta seguro?',
      'Actuaizar',
      'Cancelar'
    );
    if (isConfirmed) {
      this.especialidadService
        .updateEspecialiad(idEspecialidad, especialiadData)
        .subscribe((res) => {});

      this.cerrarModal();
    } else {
      this.cerrarModal();
    }
  }
}
