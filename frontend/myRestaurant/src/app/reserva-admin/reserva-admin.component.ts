import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';

export interface Reserva {
  hora: string;
  personas: number;
  fecha: string;
  mesa: number;
  numeroReserva: number;
  seleccionado: boolean;
}
const ELEMENT_DATA: Reserva[] = [
  { hora: '10:00', personas: 4, fecha: '2024-05-11', mesa: 1, numeroReserva:1, seleccionado: false },
  { hora: '12:00', personas: 2, fecha: '2024-05-12', mesa: 2, numeroReserva:2, seleccionado: false },
  { hora: '15:00', personas: 6, fecha: '2024-05-13', mesa: 3, numeroReserva:3, seleccionado: false },
];
@Component({
  selector: 'app-reserva-admin',
  templateUrl: './reserva-admin.component.html',
  styleUrls: ['./reserva-admin.component.scss']
})


export class ReservaAdminComponent implements OnInit {
  displayedColumns: string[] = ['select','delete','numeroReserva','hora', 'cantidadPersonas', 'fecha', 'mesa'];
  selection = new SelectionModel<Reserva>(true, []);
  dataSource = new MatTableDataSource<Reserva>(ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }
  reservas: Reserva[] = [
    { hora: '10:00', personas: 4, fecha: '2024-05-11', mesa: 1, numeroReserva:1, seleccionado: false },
    { hora: '12:00', personas: 2, fecha: '2024-05-12', mesa: 2, numeroReserva:2, seleccionado: false },
    { hora: '15:00', personas: 6, fecha: '2024-05-13', mesa: 3, numeroReserva:3, seleccionado: false },
  ];

  toggleSeleccion(index: number) {
    this.reservas[index].seleccionado = !this.reservas[index].seleccionado;
  }
  timeList: string[] = [];

  addTime(time: string) {
    this.timeList.push(time);
  }

  deleteTime(index: number) {
    this.timeList.splice(index, 1);
  }
  enviarReservas() {
    const reservasSeleccionadas = this.selection.selected;
    console.log(reservasSeleccionadas);
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
  

  deleteRow(row: Reserva): void {
    const index = this.dataSource.data.indexOf(row);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
      this.selection.deselect(row);
    }
  }
}
