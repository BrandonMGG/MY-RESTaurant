import { Component, OnInit } from '@angular/core';


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
  platosPrincipales: PlatoPrincipal[] = [
    { id: 1, nombre: 'Hamburguesa' },
    { id: 2, nombre: 'Pizza' },
    { id: 3, nombre: 'Ensalada' }
  ];

  postres: Postre[] = [
    { id: 1, nombre: 'Helado' },
    { id: 2, nombre: 'Pastel' },
    { id: 3, nombre: 'Fruta' }
  ];

  bebidas: Bebida[] = [
    { id: 1, nombre: 'Agua' },
    { id: 2, nombre: 'Refresco' },
    { id: 3, nombre: 'Jugo' }
  ];

  platoPrincipalSeleccionado: PlatoPrincipal | undefined;
  postreSeleccionado: Postre | undefined;
  bebidaSeleccionada: Bebida | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  onPlatoPrincipalChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedId = target.value ? parseInt(target.value) : undefined;
    this.platoPrincipalSeleccionado = selectedId ? this.platosPrincipales.find(p => p.id === selectedId) : undefined;
  }

  onPostreChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedId = target.value ? parseInt(target.value) : undefined;
    this.postreSeleccionado = selectedId ? this.postres.find(p => p.id === selectedId) : undefined;
  }

  onBebidaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedId = target.value ? parseInt(target.value) : undefined;
    this.bebidaSeleccionada = selectedId ? this.bebidas.find(p => p.id === selectedId) : undefined;
  }
}