import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  // Alertas de errores recibe un mensaje
  ShowErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!',
    });
  }
  // Alerta que si quiere borrar algo y si esta seguro (advertencia)
  AlertWarningDelete(mensaje: string) {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    });
  }
  // si si o si no
  ShowConfirmationAlert(
    title: string,
    message: string,
    confirmText: string,
    cancelText: string
  ): Promise<boolean> {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  //sale en medio y cierra solo
  Animado(titulo: String) {
    Swal.fire({
      title: '¡Perfil Creado!',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500,
      didOpen: (modal) => {
        setTimeout(() => {
          modal.style.opacity = '1';
          modal.style.transform = 'scale(1)';
          modal.style.transition = 'opacity 0.5s, transform 0.5s';
        }, 100);
      },
      willClose: (modal) => {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.5)';
      },
    }).then(() => {
      console.log('Animación personalizada completada');
    });
  }
  // cuadro en medio
  showSuccess(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
    });
  }
  // aprte superior izquierza
  MinShowSucces(message: string, title?: string) {
    const options: SweetAlertOptions = {
      icon: 'success',
      title: title || 'Success',
      text: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    };

    Swal.fire(options);
  }

  InputAlert(tittle?: string): Promise<string | null> {
    return new Promise((resolve) => {
      Swal.fire({
        title: tittle,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
          const valor_input = result.value;
          resolve(valor_input);
        } else {
          resolve(null);
        }
      });
      customClass: {
        input: 'input_sweet';
      }
    });
  }
}
