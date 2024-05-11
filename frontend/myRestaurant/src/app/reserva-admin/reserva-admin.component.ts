import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';

export interface Reserva {
  hora: string;
  personas: number;
  fecha: string;
  mesa: number;
  seleccionado: boolean;
}
const ELEMENT_DATA: Reserva[] = [
  { hora: '10:00', personas: 4, fecha: '2024-05-11', mesa: 1, seleccionado: false },
  { hora: '12:00', personas: 2, fecha: '2024-05-12', mesa: 2, seleccionado: false },
  { hora: '15:00', personas: 6, fecha: '2024-05-13', mesa: 3, seleccionado: false },
];
@Component({
  selector: 'app-reserva-admin',
  templateUrl: './reserva-admin.component.html',
  styleUrls: ['./reserva-admin.component.scss']
})


export class ReservaAdminComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  selection = new SelectionModel<Reserva>(true, []);
  dataSource = new MatTableDataSource<Reserva>(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }
  reservas: Reserva[] = [
    { hora: '10:00', personas: 4, fecha: '2024-05-11', mesa: 1, seleccionado: false },
    { hora: '12:00', personas: 2, fecha: '2024-05-12', mesa: 2, seleccionado: false },
    { hora: '15:00', personas: 6, fecha: '2024-05-13', mesa: 3, seleccionado: false },
  ];

  toggleSeleccion(index: number) {
    this.reservas[index].seleccionado = !this.reservas[index].seleccionado;
  }

  enviarReservas() {
    const reservasSeleccionadas = this.reservas.filter(reserva => reserva.seleccionado);
    console.log(reservasSeleccionadas); // Aquí podrías enviar los datos al backend
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Reserva): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.mesa + 1}`;
  }
}
