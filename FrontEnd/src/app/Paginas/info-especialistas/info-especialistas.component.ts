import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { EspecialidadesServiceService } from 'src/app/Services/Especialidades/especialidades-service.service';

@Component({
  selector: 'app-info-especialistas',
  templateUrl: './info-especialistas.component.html',
  styleUrls: ['./info-especialistas.component.css'],
})
export class InfoEspecialistasComponent {
  public ListaEspecialidades = [];
  selectedEspecialidad: string | null = null;
  selectedEstado: string | null = null;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private especialidadesService: EspecialidadesServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ListaEspecialidad();
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

  public onSubmit() {
    console.log('Especialidad seleccionada:', this.selectedEspecialidad);
    console.log('Estado seleccionado:', this.selectedEstado);
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
