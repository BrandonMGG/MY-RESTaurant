import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  errorMessage:string='';

  constructor(private auth:AuthService) { }
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
