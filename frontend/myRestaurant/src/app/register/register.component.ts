import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  confirm:string;
  form:FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { 

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm:['', Validators.required],

      
    });
  }
  registerUser() {
    //logica para enviar datos
    console.log("registrando usuario")
    this.userService.register(this.form.value.email, this.form.value.password, this.form.value.confirm).subscribe(response => {
         console.log(response);
      }, (error => { console.error("Error",error) }
      )
      )
  }
  ngOnInit(): void {
  }

}
