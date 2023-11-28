import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { EspecialidadesServiceService } from 'src/app/Services/Especialidades/especialidades-service.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';

@Component({
  selector: 'app-modal-especialidades-agregar',
  templateUrl: './modal-especialidades-agregar.component.html',
  styleUrls: ['./modal-especialidades-agregar.component.css'],
})
export class ModalEspecialidadesAgregarComponent {
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private especialidadService: EspecialidadesServiceService,
    public LoginService: LoginServiceService
  ) {
    this.initForm();
  }

  @Output() cerrar = new EventEmitter<void>();

  cerrarModal(): void {
    this.cerrar.emit();
  }

  async Create(): Promise<void> {
    if (this.formulario.valid) {
      const especialidadData = this.formulario.value;
      console.log(especialidadData);

      const isConfirmed = await this.alertService.ShowConfirmationAlert(
        'Se creará una nueva especialidad',
        '¿Está seguro?',
        'Aceptar',
        'Cancelar'
      );

      if (isConfirmed) {
        this.especialidadService
          .createEspecialidad(especialidadData)
          .subscribe((res) => {
            console.log(res);
            this.alertService.MinShowSucces('Correcto', res.message);
          });

        setTimeout(() => {
          location.reload();
        }, 3000);
        // console.log(especialidadData);
        this.cerrarModal();
      } else {
        this.cerrarModal();
      }
    }
  }

  private initForm(): void {
    this.formulario = this.fb.group({
      nombreEspecialidad: ['', Validators.required],
    });
  }
}
