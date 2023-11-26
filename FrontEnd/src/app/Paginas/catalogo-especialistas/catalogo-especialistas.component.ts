import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { EspecialidadesServiceService } from 'src/app/Services/Especialidades/especialidades-service.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';

@Component({
  selector: 'app-catalogo-especialistas',
  templateUrl: './catalogo-especialistas.component.html',
  styleUrls: ['./catalogo-especialistas.component.css'],
})
export class CatalogoEspecialistasComponent implements OnInit {
  public ListaEspecialidades = [];
  public Especialistas: any[] = [];

  selectedEspecialidad: string | null = null;
  selectedEstado: string | null = null;

  constructor(
    private fb: FormBuilder,
    private Alertas: AlertService,
    private especialidadesService: EspecialidadesServiceService,
    private router: Router,
    private loginService: LoginServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ListaEspecialidad();
    this.route.queryParams.subscribe((params) => {
      // Llama a ListaEspecialistas con los parámetros obtenidos de la URL
      const idEspecialidad = params['especialidad']
        ? +params['especialidad']
        : undefined;
      this.ListaEspecialistas(idEspecialidad, params['estado']);
    });
    const tokencio = localStorage.getItem('token');

    if (tokencio != null) {
      this.loginService.scheduleTokenCheck();
    }
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

  private ListaEspecialistas(idEspecialidad?: any | null, estado?: any | null) {
    this.especialidadesService.Especialistas(idEspecialidad, estado).subscribe(
      (res) => {
        // console.log('Respuesta completa especialistas:', res);

        if (res && res.$values) {
          this.Especialistas = res.$values;
          // console.log(this.Especialistas);

          if (this.Especialistas && this.Especialistas.length > 0) {
            // console.log('ListaEspecialidades:', this.ListaEspecialidades);
          } else {
            console.log(
              'ListaEspecialistas está vacía o indefinida después de la asignación.'
            );
          }
        } else {
          console.log('La respuesta no tiene la estructura esperada.');
        }
      },
      (error) => {
        this.Alertas.ShowErrorAlert('No hay Especialistas :(');
        if (error.status === 404) {
          this.Alertas.ShowErrorAlert('No hay Especialistas :(');
        } else {
          console.log('Error en la llamada:', error);
        }
        console.log('Error en la llamada:', error);
      }
    );
  }

  private ListaEspecialidad() {
    this.especialidadesService.Especialidades().subscribe(
      (res) => {
        // console.log('Respuesta completa:', res);

        if (res && res.$values) {
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
  verInformacionEspecialista(especialistaId: number) {
    this.router.navigate(['/info-especialistas'], {
      queryParams: { id: especialistaId },
    });
  }

  public onSubmit() {
    console.log('Especialidad seleccionada:', this.selectedEspecialidad);
    console.log('Estado seleccionado:', this.selectedEstado);
    this.Especialistas = [];
    this.ListaEspecialistas(this.selectedEspecialidad, this.selectedEstado);
  }

  private logEspecialidades() {
    if (this.ListaEspecialidades && this.ListaEspecialidades.length > 0) {
      // console.log(this.ListaEspecialidades);
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
