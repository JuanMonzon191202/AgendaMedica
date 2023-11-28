import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Paginas/login/login.component';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './Paginas/registro/registro.component';
import { HomeComponent } from './Paginas/home/home.component';
import { CatalogoEspecialistasComponent } from './Paginas/catalogo-especialistas/catalogo-especialistas.component';
import { InfoEspecialistasComponent } from './Paginas/info-especialistas/info-especialistas.component';
import { ConfiguracionCuentaComponent } from './Paginas/configuracion-cuenta/configuracion-cuenta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ObjToArray } from './ObjToArray.pipe';
import { JwtModule } from '@auth0/angular-jwt';
import { ConfiguracionCuentaEspecialistaComponent } from './Paginas/configuracion-cuenta-especialista/configuracion-cuenta-especialista.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './Paginas/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminDashboardComponent } from './Paginas/admin-dashboard/admin-dashboard.component';
import { CitasComponent } from './Paginas/citas/citas.component';
import { FooterComponent } from './Paginas/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UsuariosComponent } from './Paginas/usuarios/usuarios.component';
import { ModalComponent } from './Paginas/modal/modal.component';
import { ModalPacienteComponent } from './Paginas/modal-paciente/modal-paciente.component';
import { ModalEspecialidadesComponent } from './Paginas/modal-especialidades/modal-especialidades.component';
import { ModalEspecialidadesAgregarComponent } from './Paginas/modal-especialidades-agregar/modal-especialidades-agregar.component';
import { ModalRolesComponent } from './Paginas/modal-roles/modal-roles.component';
import { ModalRolesCreateComponent } from './Paginas/modal-roles-create/modal-roles-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    CatalogoEspecialistasComponent,
    InfoEspecialistasComponent,
    ConfiguracionCuentaComponent,
    ObjToArray,
    ConfiguracionCuentaEspecialistaComponent,
    NavbarComponent,
    AdminDashboardComponent,
    CitasComponent,
    FooterComponent,
    UsuariosComponent,
    ModalComponent,
    ModalPacienteComponent,
    ModalEspecialidadesComponent,
    ModalEspecialidadesAgregarComponent,
    ModalRolesComponent,
    ModalRolesCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'home', component: HomeComponent },
      { path: 'especialistas', component: CatalogoEspecialistasComponent },
      { path: 'info-especialistas', component: InfoEspecialistasComponent },
      { path: 'configuracion-cuenta', component: ConfiguracionCuentaComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'configuracion-especialista',
        component: ConfiguracionCuentaEspecialistaComponent,
      },
      { path: 'Admin-Dashboard', component: AdminDashboardComponent },
      { path: 'Mis-citas', component: CitasComponent },
      { path: 'admin-area-usuarios', component: UsuariosComponent },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
