import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


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
          localStorage.setItem('email', response.email)
          localStorage.setItem('role', response.role)
          console.log("rol", response.role)
          this.router.navigate(['/']); // Redirige al dashboard después de iniciar sesión

        },
        error => {
          this.errorMessage = error.error.message;
          console.log(this.errorMessage)

        }
      )
  }
  ngOnInit(): void {
  }

}