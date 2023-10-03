import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public mostrarPassword() {
    const pass = document.getElementById('inputPassword') as HTMLInputElement;
    const activador = document.getElementById('mostrarPass') as HTMLElement;
    pass.type = "text";
  }
}
