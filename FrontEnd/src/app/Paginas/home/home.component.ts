import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { EspecialidadesServiceService } from 'src/app/Services/Especialidades/especialidades-service.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public ListaEspecialidades = [];
  selectedEspecialidad: string | null = null;
  selectedEstado: string | null = null;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private especialidadesService: EspecialidadesServiceService,
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  ngOnInit(): void {
    this.ListaEspecialidad();
    const tokencio = localStorage.getItem('token');

    if (tokencio != null) {
      this.loginService.scheduleTokenCheck();
    }
  }

  hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si token existe, false si no existe
  }

  private ListaEspecialidad() {
    this.especialidadesService.Especialidades().subscribe(
      (res) => {
        console.log('Respuesta completa:', res);

        if (res && res.$values) {
          // console.log('Valores en la respuesta:', res.$values);

          this.ListaEspecialidades = res.$values;

          if (this.ListaEspecialidades && this.ListaEspecialidades.length > 0) {
            // console.log('ListaEspecialidades:', this.ListaEspecialidades);
          } else {
            console.log(
              'ListaEspecialidades está vacía o indefinida después de la asignación.'
            );
          }
        } else {
          console.log('La respuesta no tiene la estructura esperada.');
        }
      },
      (error) => {
        console.log('Error en la llamada:', error);
      }
    );
  }

  onSubmit(): void {
    this.router.navigate(['/especialistas'], {
      queryParams: {
        especialidad: this.selectedEspecialidad,
        estado: this.selectedEstado,
      },
    });
  }
  getProfileLink(): string {
    const tokenRol = this.loginService.getUserRole();
    const adminRoute = '/admin-area-usuarios';
    const userRoute = '/configuracion-cuenta';
    const especialistaRoute = '/configuracion-especialista';

    return tokenRol === 'Administrador'
      ? adminRoute
      : tokenRol === 'Especialista'
      ? especialistaRoute
      : userRoute;
  }

  private logEspecialidades() {
    if (this.ListaEspecialidades && this.ListaEspecialidades.length > 0) {
      console.log(this.ListaEspecialidades);
    } else {
      console.log('ListaEspecialidades está vacía o indefinida.');
    }
  }
  estadosMexico = [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Coahuila',
    'Colima',
    'Durango',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'México',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas',
  ];
}
