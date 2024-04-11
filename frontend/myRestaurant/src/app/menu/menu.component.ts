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
  formFeedback: FormGroup;

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
    this.formFeedback = this.formBuilder.group({
      feedbackControl: ['',Validators.required]
    });
  }

  ngOnInit(): void {
   this.updateMenu();
  }

  updateMenu(){
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
    this.menuService.getRecomendation(data).subscribe((data) => {
      this.recomendation = data;
    });
    this.updateMenu();
  }
  postFeedback(){
    const mensaje = {
      mensaje : this.formFeedback.value.feedbackControl
    };

    this.menuService.postFeedback(mensaje).subscribe((data) => {
      this.feedback = data;
    });

  }
  disableLeftOver() {
  }

  onPlatoPrincipalChange(event: Event): void {
    console.log(this.formulario.value.platoPrincipal);
  }

}