import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { RegistroServiceService } from 'src/app/Services/Registro/registro-service.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private RegistroService: RegistroServiceService,
    private Alertas: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  public mostrarPassword() {
    const pass = document.getElementById('inputPassword') as HTMLInputElement;
    const activador = document.getElementById('mostrarPass') as HTMLElement;
    pass.type = 'text';
  }

  public Register() {
    if (this.registerForm.valid) {
      this.RegistroService.Crear(this.registerForm.value).subscribe(
        (response) => {
          console.log(response.mensage);
          if (response.mensage === 'Perfil Creado') {
            this.Alertas.Animado('Perfil Creado');
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.Alertas.ShowErrorAlert('error en el servidor');
        }
      );
    } else {
      this.Alertas.ShowErrorAlert('Campos vacios');
    }
  }
  //TODO agregar los demas campos del registro
  private initForm(): void {
    this.registerForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      IdRol: ['', Validators.required],
    });
  }
}
