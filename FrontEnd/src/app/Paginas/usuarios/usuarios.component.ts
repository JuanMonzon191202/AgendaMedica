import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { EspecialidadesServiceService } from 'src/app/Services/Especialidades/especialidades-service.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';
import { RegistroServiceService } from 'src/app/Services/Registro/registro-service.service';
import { UsuariosService } from 'src/app/Services/Usuarios/usuarios.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  contenidoPrincipal: string = 'Contenido predeterminado';
  userData: any;
  userDataPaciente: any;
  selectedUser: any;
  selectedUserPaciente: any;

  modalAbierto: boolean = false;
  modalAbiertoPaciente: boolean = false;

  contenidoAMostrar: string = ''; // Variable para determinar el contenido

  constructor(
    private fb: FormBuilder,
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
      console.log(tokenRol);

      if (tokenRol === 'Administrador') {
        // this.getUserData();
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
      console.log(this.userDataPaciente);

      this.contenidoAMostrar = 'Mostrar pacientes'; // Puedes asignar el contenido que quieras
    });
  }

  visualizarEspecialistas(): void {
    this.userService.ListarEspecialistas().subscribe((response) => {
      console.log(response);
      this.userData = response.$values;
      console.log(this.userData);

      this.contenidoAMostrar = 'Mostrar especialistas'; // Puedes asignar el contenido que quieras
    });
  }

  visualizarNoAutorizados(): void {
    this.userService.ListarEspecialistasNon().subscribe((response) => {
      console.log(response);
      this.userData = response.$values;
      this.contenidoAMostrar = 'Mostrar especialistas no autorizados'; // Puedes asignar el contenido que quieras
    });
  }
  openModal(user: any): void {
    this.selectedUser = user;
    console.log(this.selectedUser);

    this.modalAbierto = true;
  }

  editInfo(user: any): void {
    this.selectedUser = user;
    this.modalAbierto = true;
  }

  cerrarModalPaciente(): void {
    this.selectedUserPaciente = null;
    this.modalAbiertoPaciente = false;
  }
  //
  openModalPaciente(user: any): void {
    this.selectedUserPaciente = user;
    console.log(this.selectedUser);

    this.modalAbiertoPaciente = true;
  }

  editInfoPaciente(user: any): void {
    this.selectedUserPaciente = user;
    this.modalAbiertoPaciente = true;
  }

  cerrarModal(): void {
    this.selectedUserPaciente = null;
    this.modalAbierto = false;
    this.modalAbiertoPaciente = false;
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
