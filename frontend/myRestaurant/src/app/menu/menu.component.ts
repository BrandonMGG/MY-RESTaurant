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

  disablePostre: boolean;
  disablePlato: boolean;
  disableBebida: boolean;

  recomendation: any;
  feedback: any;

  constructor(private menuService: MenuService, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      platoPrincipal: ['', Validators.required],
      postres: ['', Validators.required],
      bebidas: ['', Validators.required],
    });
    this.formFeedback = this.formBuilder.group({
      feedbackControl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateMenu();
  }

  /**
   * Actualiza los platillos principales, postres y bebidas del menú en base a la respuesta
   * obtenida del servicio de menú.
   * 
   * @returns No devuelve ningún valor directamente. Los datos del menú se asignan a las
   *          variables platosPrincipales, postres y bebidas de la clase o componente.
   */
  updateMenu() {
    this.menuService.getMenu().subscribe((data) => {
      this.platosPrincipales = data.platosPrincipales;    // Asigna los platillos principales recibidos a la variable platosPrincipales.
      this.postres = data.postres;  // Asigna los postres recibidos a la variable postres.
      this.bebidas = data.bebidas;  // Asigna las bebidas recibidas a la variable bebidas.
    });
  }

  /**
 * Obtiene una recomendación de bebida, postre y plato principal basada en los platillos
 * seleccionados por el usuario.
 * 
 * @returns No devuelve ningún valor directamente. La recomendación se asigna a la variable
 *          recomendation de la clase o componente.
 */
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

  /**
 * Envia un mensaje de feedback al sistema con el comentario del usuario.
 * 
 * @returns No devuelve ningún valor directamente. La respuesta del servicio se asigna
 *          a la variable feedback de la clase o componente.
 */
  postFeedback() {
    const mensaje = {  // Obtiene el mensaje de feedback del formulario.
      mensaje: this.formFeedback.value.feedbackControl
    };
    // Realiza una solicitud al servicio menuService para enviar el feedback.
    this.menuService.postFeedback(mensaje).subscribe((data) => {
      this.feedback = data;    // Asigna la respuesta recibida a la variable feedback.

    });

  }
  disableLeftOver() {
  }

  onPlatoPrincipalChange(event: Event): void {
    console.log(this.formulario.value.platoPrincipal);
  }

}