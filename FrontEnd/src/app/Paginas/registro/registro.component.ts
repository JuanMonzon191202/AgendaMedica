import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { RegistroServiceService } from 'src/app/Services/Registro/registro-service.service';
import { UsuariosService } from 'src/app/Services/Usuarios/usuarios.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  public registerForm!: FormGroup;
  public registerFormEspe!: FormGroup;
  public registerFormPaci!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private RegistroService: RegistroServiceService,
    private userSerive: UsuariosService,
    private Alertas: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public Register() {
    

    if (this.registerForm.valid) {
      this.RegistroService.Crear(this.registerForm.value).subscribe(
        (response) => {
          console.log(response);

          const message = response.message;

          if (message === 'Perfil Creado') {
            const roles = response.usuario.idRol;
           

            if (roles === 2) {
              

              this.Formulario(response.usuario.id);
              this.userSerive
                .crearEspecialista(this.registerFormEspe.value)
                .subscribe((response) => {
                  console.log(response);
                });
            }
            if (roles === 3) {
             

              this.FormularioPaciente(response.usuario.id);
              this.userSerive
                .crearPaciente(this.registerFormPaci.value)
                .subscribe((response) => {
       
                });
            }
            this.Alertas.Animado('Perfil Creado');
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          this.Alertas.ShowErrorAlert('error en el servidor');
          console.log(error);
        }
      );
    } else {
      this.Alertas.ShowErrorAlert('Campos vacios');
    }
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      IdRol: ['', Validators.required],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      IsActive: [true],
      Foto: [''],
    });
  }
  private Formulario(idUsuario: number): void {
    this.registerFormEspe = this.fb.group({
      idUsuario: [idUsuario],
      direccion: [''],
      ciudad: [''],
      pais: [''],
      noCedula: [''],
      descripcion: [''],
    });
  }
  private FormularioPaciente(idUsuario: number): void {
    this.registerFormPaci = this.fb.group({
      idUsuario: [idUsuario],
      telefono: [''],
      genero: [''],
    });
  }
}
