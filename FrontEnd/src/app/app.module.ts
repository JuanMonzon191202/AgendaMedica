import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Paginas/login/login.component';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './Paginas/registro/registro.component';
import { HomeComponent } from './Paginas/home/home.component';
import { CatalogoEspecialistasComponent } from './Paginas/catalogo-especialistas/catalogo-especialistas.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistroComponent, HomeComponent, CatalogoEspecialistasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'home', component: HomeComponent },
      { path: 'especialistas', component: CatalogoEspecialistasComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
