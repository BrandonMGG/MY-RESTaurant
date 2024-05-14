import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DatePipe } from '@angular/common';
import { ReservaAdminService } from './reserva-admin.service';


export interface Reserva {
  hora: string;
  personas: number;
  fecha: string;
  mesa: number;
  numeroReserva: number;
  seleccionado: boolean;
}

@Component({
  selector: 'app-reserva-admin',
  templateUrl: './reserva-admin.component.html',
  styleUrls: ['./reserva-admin.component.scss']
})


export class ReservaAdminComponent implements OnInit {
  displayedColumns: string[] = ['select','delete','numeroReserva','hora', 'cantidadPersonas', 'fecha', 'mesa'];
  selection = new SelectionModel<Reserva>(true, []);
  dataSource = new MatTableDataSource<Reserva>();
  fechaSeleccionada: Date;
  horaSeleccionada: string;
  reservas: any;

  constructor(private datePipe: DatePipe, private reserAdmin: ReservaAdminService) { }

  ngOnInit(): void {
    this.reserAdmin.getReservaAdmin().subscribe((data) => {
      this.reservas = data;
      this.dataSource.data = this.reservas?.reservas;
    });
  }


  toggleSeleccion(index: number) {
    this.reservas[index].seleccionado = !this.reservas[index].seleccionado;
  }
  timeList: string[] = [];

  addTime(time: string) {
    console.log(this.dataSource.data);
    this.timeList.push(time);
    const fechaFormateada = this.datePipe.transform(this.fechaSeleccionada, 'yyyy-MM-dd');
    const data ={
      fecha: fechaFormateada,
      hora: this.horaSeleccionada
    }
    console.log(data);
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
