import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { EspecialidadesServiceService } from 'src/app/Services/Especialidades/especialidades-service.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';

@Component({
  selector: 'app-modal-roles-create',
  templateUrl: './modal-roles-create.component.html',
  styleUrls: ['./modal-roles-create.component.css'],
})
export class ModalRolesCreateComponent {
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
      const rolesdData = this.formulario.value;
      console.log(rolesdData);

      const isConfirmed = await this.alertService.ShowConfirmationAlert(
        'Se creará una nueva especialidad',
        '¿Está seguro?',
        'Aceptar',
        'Cancelar'
      );

      if (isConfirmed) {
        this.especialidadService.createRoles(rolesdData).subscribe((res) => {
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
      nombreRol: ['', Validators.required],
    });
  }
}
