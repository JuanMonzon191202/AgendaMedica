import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  public mostrarPassword() {
    const pass = document.getElementById('inputPassword') as HTMLInputElement;
    const activador = document.getElementById('mostrarPass') as HTMLElement;
    pass.type = "text";
  }


}
