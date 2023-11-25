import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { EspecialidadesServiceService } from 'src/app/Services/Especialidades/especialidades-service.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';

@Component({
  selector: 'app-info-especialistas',
  templateUrl: './info-especialistas.component.html',
  styleUrls: ['./info-especialistas.component.css'],
})
export class InfoEspecialistasComponent {
  public ListaEspecialidades = [];
  public userData: any;
  selectedDate = new FormControl(new Date());
  selectedEspecialidad: string | null = null;
  selectedEstado: string | null = null;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private especialidadesService: EspecialidadesServiceService,
    private loginService: LoginServiceService,
    private route: ActivatedRoute, // Cambia la importación a ActivatedRoute
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.DataEspecialista(id);
    });
    const tokencio = localStorage.getItem('token');

    if (tokencio != null) {
      this.loginService.scheduleTokenCheck();
    }
  }

  private DataEspecialista(id: number) {
    // console.log('ID del especialista:', id);
    this.especialidadesService.especialistaInfo(id).subscribe((res) => {
      console.log('Esto es el res', res);
      this.userData = res;
      console.log(this.userData);
    });
  }

  private logEspecialidades() {
    if (this.ListaEspecialidades && this.ListaEspecialidades.length > 0) {
      console.log(this.ListaEspecialidades);
    } else {
      console.log('ListaEspecialidades está vacía o indefinida.');
    }
  }
}
