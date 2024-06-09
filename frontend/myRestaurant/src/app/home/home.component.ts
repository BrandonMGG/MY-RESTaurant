import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  client: boolean;
  tipoUsuario: any;


  constructor() {
    this.client = true;
    this.obtenerTipoUsuario();
  }

  ngOnInit(): void {
  }
  obtenerTipoUsuario() {
    if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "user") {
      this.client = true;
      this.tipoUsuario = localStorage.getItem('role');
    }
    else {
      this.client = false;
    }
  }
}
