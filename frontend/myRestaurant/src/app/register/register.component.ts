import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(private userService: UserService) { }
  registerUser() {
    //logica para enviar datos
    console.log("registrando usuario")
    this.userService.register(this.email, this.password).subscribe(response => {
        console.log(response);
      }, (error => { console.error("Error",error) }
      )
      )
  }
  ngOnInit(): void {
  }

}
