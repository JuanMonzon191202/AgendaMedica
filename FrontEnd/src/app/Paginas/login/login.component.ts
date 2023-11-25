import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/AlerServices/alert.service';
import { LoginServiceService } from 'src/app/Services/Login/login-service.service';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appComponent: AppComponent,
    private loginService: LoginServiceService,
    private Alertas: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    const tokencio = localStorage.getItem('token');

    if (tokencio != null) {
      this.loginService.scheduleTokenCheck();
    }
  }

  public mostrarPassword() {
    const pass = document.getElementById('Password') as HTMLInputElement;
    const activador = document.getElementById('mostrarPass') as HTMLElement;
    pass.type = 'text';
  }

  public Login() {
    if (this.loginForm.valid) {
      this.loginService.Login(this.loginForm.value).subscribe(
        (response) => {
          console.log(response.message);
          // console.log(response);

          if (response.message === 'Login Completo') {
            this.Alertas.showSuccess('-Directorio-', 'bienvenido');
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.Alertas.ShowErrorAlert('credenciales incorrectas');
        }
      );
    } else {
      this.Alertas.ShowErrorAlert('Campos vacios');
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
}
