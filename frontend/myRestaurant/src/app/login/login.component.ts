import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  form: FormGroup;
  responseMessage: string = '';
  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) {

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });

  }
  login() {
    this.auth.login(this.form.value.email, this.form.value.password)
      .subscribe(
        response => {
          console.log(response);
          this.responseMessage = response.message
          localStorage.setItem('token', response.token)
          //localStorage.setItem('role', response.role)
          localStorage.setItem('role', this.getUserRole())
          localStorage.setItem('email', this.getUserEmail())
          console.log("rol", this.getUserRole())
          this.router.navigate(['/']); // Redirige al dashboard después de iniciar sesión

        },
        error => {
          this.errorMessage = error.error.message;
          console.log(this.errorMessage)

        }
      )
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserRole(): any {
    const decoded = this.decodeToken();
    return decoded ? decoded.role : null;
  }
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
  getUserEmail(): any {
    const decoded = this.decodeToken();
    return decoded ? decoded.email : null;
  }
  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);
    return expirationDate < new Date();
  }
  ngOnInit(): void {
  }

}
