import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
  displayedColumns: string[] = ['select', 'delete', 'numeroReserva', 'hora', 'cantidadPersonas', 'fecha', 'mesa', 'localidad'];
  selection = new SelectionModel<Reserva>(true, []);
  dataSource = new MatTableDataSource<Reserva>();
  fechaSeleccionada: Date;
  horaSeleccionada: string;
  localidad: string;
  reservas: any;
  localidades: any[];

  constructor(private datePipe: DatePipe, private reserAdmin: ReservaAdminService) { }

  ngOnInit(): void {
    this.reserAdmin.getReservaAdmin().subscribe((data) => {
      this.reservas = data;
      this.dataSource.data = this.reservas?.reservas;
    });
    this.reserAdmin.getLocalidades().subscribe((data) => {
      this.localidades = data.localidades;
    });
  }

  toggleSeleccion(index: number) {
    this.reservas[index].seleccionado = !this.reservas[index].seleccionado;
  }
  timeList: string[] = [];

  addTime(time: string) {
    console.log(this.localidades);
    console.log(this.dataSource.data);
    this.timeList.push(time);
    const fechaFormateada = this.datePipe.transform(this.fechaSeleccionada, 'yyyy-MM-dd');
    const data = {
      fecha: fechaFormateada,
      hora: this.horaSeleccionada
    }
    console.log(data);
    this.reserAdmin.agregarHora(data).subscribe((data) => {

    });

    console.log(data);
  }
  deleteTime(index: number) {
    this.timeList.splice(index, 1);
  }
  enviarReservas() {
    const reservasSeleccionadas = this.selection.selected;
    console.log(reservasSeleccionadas);

    // Crear un arreglo para almacenar los datos de las reservas seleccionadas
    const dataToSend: { id: number; mesa: number; personas: number; hora: string; fecha: string; }[] = [];

    // Iterar sobre las reservas seleccionadas y construir los datos necesarios
    reservasSeleccionadas.forEach(reserva => {
      const datat = {
        id: reserva.numeroReserva,
        mesa: reserva.mesa,
        personas: reserva.personas,
        hora: reserva.hora,
        fecha: reserva.fecha
      };
      dataToSend.push(datat); // Agregar los datos de la reserva al arreglo
    });

    console.log(dataToSend);

    // Enviar los datos de las reservas seleccionadas al servicio
    this.reserAdmin.editReserva(dataToSend[0]).subscribe((data) => {
      // Manejar la respuesta del servicio si es necesario
    });
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

  deleteRow(row: any): void {
    console.log(row);
    console.log(row.id);
    const data = {
      id: row.id
    }
    this.reserAdmin.deleteReserva(data).subscribe(
      () => {
        console.log('Data deleted successfully!');
      },
      error => {
        console.error('Error deleting data:', error);
      }
    );
    const index = this.dataSource.data.indexOf(row);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
      this.selection.deselect(row);
    }
  }
}
