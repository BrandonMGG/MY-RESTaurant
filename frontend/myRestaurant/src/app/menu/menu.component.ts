import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PlatoPrincipal {
  id: number;
  nombre: string;
}

export interface Postre {
  id: number;
  nombre: string;
}

export interface Bebida {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  platosPrincipales: PlatoPrincipal[];

  postres: Postre[];

  bebidas: Bebida[];

  platoPrincipalSeleccionado: PlatoPrincipal | undefined;
  postreSeleccionado: Postre | undefined;
  bebidaSeleccionada: Bebida | undefined;

  formulario: FormGroup;
  disablePostre:boolean;
  disablePlato:boolean;
  disableBebida:boolean;
  
  recomendation:any;
  feedback:any;

  constructor(private menuService: MenuService, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      platoPrincipal: ['', Validators.required],
      postres: ['', Validators.required],
      bebidas: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.menuService.getMenu().subscribe((data) => {
      this.platosPrincipales = data.platosPrincipales;
      this.postres = data.postres;
      this.bebidas = data.bebidas;
    });
  }

  getRecomendation() {
    const data = {
      platoPrincipal: this.formulario.value.platoPrincipal,
      postres: this.formulario.value.postres,
      bebidas: this.formulario.value.bebidas,
    };
    console.log(data);
    this.menuService.getRecomendation().subscribe((data) => {
      this.recomendation = data;
    });
  }

  disableLeftOver() {
  }
  onPlatoPrincipalChange(event: Event): void {

    console.log(this.formulario.value.platoPrincipal);

  }

}