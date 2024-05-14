import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  errorMessage:string='';
  form:FormGroup;
  constructor(private auth:AuthService, private formBuilder:FormBuilder) { 

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      
    });

  }
  login(){
    this.auth.login(this.email, this.password)
    .subscribe(
      response=>{
          console.log(response);
      },
      error=>{
        this.errorMessage=error.message;
        console.log(this.errorMessage)
      }
  )
  }
  ngOnInit(): void {
  }

}
