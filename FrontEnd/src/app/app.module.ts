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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'home', component: HomeComponent },
      { path: 'especialistas', component: CatalogoEspecialistasComponent },
      { path: 'info-especialistas', component: InfoEspecialistasComponent },
      { path: 'configuracion-cuenta', component: ConfiguracionCuentaComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
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
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
