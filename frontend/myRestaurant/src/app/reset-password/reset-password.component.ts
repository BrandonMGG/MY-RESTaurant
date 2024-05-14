import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: string = '';
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) { }

  resetPassword(): void {
    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.authService.resetPassword(this.email)
      .subscribe(
        () => {
          this.loading = false;
          this.successMessage = 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.';
        },
        (error) => {
          this.loading = false;
          this.error = 'Ha ocurrido un error al enviar la solicitud de restablecimiento de contraseña. Por favor, inténtalo de nuevo más tarde.';
          console.error('Error al restablecer contraseña:', error);
        }
      );
  }
  ngOnInit(): void {
  }

}
