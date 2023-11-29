import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { EspecialidadesServiceService } from 'src/app/Services/Especialidades/especialidades-service.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';
import { UsuariosService } from 'src/app/Services/Usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  contenidoPrincipal: string = 'Contenido predeterminado';
  userData: any;
  userDataPaciente: any;
  especialidadesData: any;
  rolesData: any;
  selectedUser: any;
  selectedUserPaciente: any;
  selectedEspecialiad: any;
  selectedRol: any;
  newRol: any;
  modalAbierto: boolean = false;
  modalAbiertoPaciente: boolean = false;
  modalAbiertoEspecialidad: boolean = false;
  modalAbiertoEspecialidadCreate: boolean = false;
  modalAbiertoRoles: boolean = false;
  modalAbiertoRolesCreate: boolean = false;

  contenidoAMostrar: string = ''; // Variable para determinar el contenido

  constructor(
    private fb: FormBuilder,
    private especialidadesService: EspecialidadesServiceService,
    private alertService: AlertService,
    private userService: UsuariosService,
    private router: Router,
    public LoginService: LoginServiceService
  ) {}
  ngOnInit(): void {
    const tokencio = localStorage.getItem('token');

    if (tokencio != null) {
      this.LoginService.scheduleTokenCheck();
    }

    if (tokencio === null) {
      this.alertService.ShowErrorAlert('Primero inicia sesión');
      this.router.navigate(['/login']);
    } else {
      const tokenRol = this.LoginService.getUserRole();

      if (tokenRol === 'Administrador') {
        // this.alertService.MinShowSucces(
        //   'Un gran poder conlleva una gran responsabilidad',
        //   'Bienvenido Admin'
        // );
      } else {
        this.alertService.ShowErrorAlert(
          'No tienes permiso a esta vista (-.-)'
        );
        this.router.navigate(['/home']);
      }
    }
  }

  visualizarPacientes(): void {
    this.userService.ListarPacientes().subscribe((response) => {
      this.userDataPaciente = response.$values;

      this.contenidoAMostrar = 'Mostrar pacientes'; // Puedes asignar el contenido que quieras
    });
  }

  visualizarEspecialistas(): void {
    this.userService.ListarEspecialistas().subscribe((response) => {
      this.userData = response.$values;

      this.contenidoAMostrar = 'Mostrar especialistas'; // Puedes asignar el contenido que quieras
    });
  }

  visualizarNoAutorizados(): void {
    this.userService.ListarEspecialistasNon().subscribe((response) => {
      this.userData = response.$values;
      this.contenidoAMostrar = 'Mostrar especialistas no autorizados'; // Puedes asignar el contenido que quieras
    });
  }
  especialidades(): void {
    this.especialidadesService.Especialidades().subscribe((response) => {
      this.especialidadesData = response.$values;
      this.contenidoAMostrar = 'Mostrar especialidades';
    });
  }

  roles(): void {
    this.especialidadesService.listaRoles().subscribe((response) => {
      this.rolesData = response.$values;
      this.contenidoAMostrar = 'Mostrar roles';
    });
  }

  // modal para especialista
  openModal(user: any): void {
    this.selectedUser = user;

    this.modalAbierto = true;
  }

  editInfo(user: any): void {
    this.selectedUser = user;
    this.modalAbierto = true;
  }
  // modales para pacientes (Usuario)

  cerrarModalPaciente(): void {
    this.selectedUserPaciente = null;
    this.modalAbiertoPaciente = false;
  }
  //
  openModalPaciente(user: any): void {
    this.selectedUserPaciente = user;
    // console.log(this.selectedUser);

    this.modalAbiertoPaciente = true;
  }

  editInfoPaciente(user: any): void {
    this.selectedUserPaciente = user;
    this.modalAbiertoPaciente = true;
  }
  // modal para las especialidades

  openModalEspecialiad(user: any): void {
    this.selectedEspecialiad = user;

    this.modalAbiertoEspecialidad = true;
  }
  editInfoEspecialiad(user: any): void {
    this.selectedEspecialiad = user;
    this.modalAbiertoEspecialidad = true;
  }
  cerrarModalEspecialidad(): void {
    this.selectedEspecialiad = null;
    this.modalAbiertoEspecialidad = false;
  }
  //  modal create especialidad
  openModalEspecialiadCreate(): void {
    this.modalAbiertoEspecialidadCreate = true;
  }
  editInfoEspecialiadCreate(): void {
    this.modalAbiertoEspecialidadCreate = true;
  }
  cerrarModalEspecialidadCreate(): void {
    this.modalAbiertoEspecialidadCreate = false;
  }
  // modal para los roles
  openModalRol(user: any): void {
    this.selectedRol = user;

    this.modalAbiertoRoles = true;
  }
  editInfoRol(user: any): void {
    this.selectedRol = user;
    this.modalAbiertoRoles = true;
  }
  cerrarModalRol(): void {
    this.selectedRol = null;
    this.modalAbiertoRoles = false;
  }
  // modal para crear roles
  openModalRolCreate(): void {
    this.modalAbiertoRolesCreate = true;
  }
  editInfoRolCreate(): void {
    this.modalAbiertoRolesCreate = true;
  }
  cerrarModalRolCreate(): void {
    this.modalAbiertoRolesCreate = false;
  }
  // cerrar todos los moades

  cerrarModal(): void {
    this.selectedUserPaciente = null;
    this.modalAbierto = false;
    this.modalAbiertoPaciente = false;
    this.cerrarModalEspecialidad();
    this.cerrarModalEspecialidadCreate();
    this.cerrarModalRolCreate();
  }
  public async cerrarsesion() {
    const isConfirmed = await this.alertService.ShowConfirmationAlert(
      '¿Estás seguro de que quieres cerrar la sesión?',
      '',
      'Si',
      'Cancelar'
    );
    if (isConfirmed) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
