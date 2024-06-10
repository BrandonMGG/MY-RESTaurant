import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReservaService } from './reserva.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


export interface Reserva {
  fecha: string;
  horas_disponibles: string[];
  mensaje: string;
}

export interface EditReserva {
  hora: string;
  personas: number;
  fecha: string;
  mesa: number;
  numeroReserva: number;
  local:string;
  seleccionado: boolean;
}

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  formattedDate: string | null;
  reserva: Reserva;
  form: FormGroup;
  reservacionForm: FormGroup;
  espaciosDisponiblesArray: string[];
  numeroDePersonas: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];
  horasDisponibles: string[];
  localesDisponibles:string[];
  selectedDate: Date;
  minDate = new Date();
  selected: Date;
  selectedReservationDate: Date;
  reservation: boolean;
  reservas: any;

  constructor(private reservaService: ReservaService, private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.form = this.formBuilder.group({
      mensaje: ['', Validators.required]
    });
    this.reservacionForm = this.formBuilder.group({
      espacioReservado: ['', Validators.required],
      numeroPersonas: ['', Validators.required],
      horaReservacion: ['', Validators.required],
      localidadReservacion: ['', Validators.required]
    });
  }

  displayedColumns: string[] = ['select', 'delete', 'numeroReserva', 'hora', 'cantidadPersonas', 'fecha', 'mesa','local'];
  selection = new SelectionModel<Reserva>(true, []);
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.reservaService.getMesas().subscribe((data) => {
      this.espaciosDisponiblesArray = data.mesas;
    });
    /*this.reservaService.getHoras().subscribe((data) => {
      this.horasDisponibles = data.horas;
    });*/
    this.reservaService.getLocalidades().subscribe((data) => {
      this.localesDisponibles = data.localidades;
    });
    this.getReservas();
  }

  editReservation() {
    console.log(this.dataSource.data);

    const datat = {
      id: this.dataSource.data[0].numeroReserva,
      mesa: this.dataSource.data[0].mesa,
      personas: this.dataSource.data[0].personas,
      hora: this.dataSource.data[0].hora,
      fecha: this.dataSource.data[0].fecha,
      local: this.dataSource.data[0].local
    };
    console.log("ACA");
    console.log(datat);
    this.reservaService.editReserva(datat).subscribe((data) => {
      this.getReservas();
    });
  }
  getReservas() {
    const user = localStorage.getItem('email');
    const data = {
      cliente:user
    }
    console.log(data)
    this.reservaService.getReservas(data).subscribe((data) => {
      this.dataSource.data = data.reservas;
    });
  }
  /**
   * Activa el proceso de realizar una reserva y formatea la fecha seleccionada si está disponible.
   * Luego, llama a la función getReserva() para obtener la sugerencia de reserva.
   * 
   * @returns No devuelve ningún valor directamente. La reserva se asigna a la variable reserva de la clase o componente.
   */
  makeReservation() {
    this.reservation = true;
    if (this.selected) {
      this.formattedDate = this.datePipe.transform(this.selected, 'yyyy-MM-dd');
    }
    this.getReserva();
  }

  /**
   * Obtiene la sugerencia de reserva según los datos ingresados por el usuario.
   * 
   * @returns No devuelve ningún valor directamente. La sugerencia de reserva se asigna a la variable reserva de la clase o componente.
   */
  getReserva() {
    // Si hay una fecha formateada, crea un objeto con el mensaje y la fecha formateada.
    if (this.formattedDate) {
      const datat = {
        mensaje: this.form.value.mensaje,
        fecha: this.formattedDate
      };
      this.reservaService.getReserva(datat).subscribe((data) => {
        this.reserva = data;
      });
    } else {
      // Si no hay fecha formateada, crea un objeto con el mensaje y una cadena vacía para la fecha.
      const datat = {
        mensaje: this.form.value.mensaje,
        fecha: ''
      };
      this.reservaService.getReserva(datat).subscribe((data) => {
        this.reserva = data;
      });
    }
  }
  doReservation() {
    const formatDate = this.datePipe.transform(this.selectedReservationDate, 'yyyy-MM-dd');
    const data = {
      mesa: this.reservacionForm.value.espacioReservado,
      personas: this.reservacionForm.value.numeroPersonas,
      hora: this.reservacionForm.value.horaReservacion,
      fecha: formatDate,
      cliente: localStorage.getItem('email'),
      local: this.reservacionForm.value.localidadReservacion
    }
    console.log(data);
    this.reservaService.makeReservation(data).subscribe((data) => {
      console.log(data);
    });
    this.getReservas();
  }

  toggleSeleccion(index: number) {
    this.reservas[index].seleccionado = !this.reservas[index].seleccionado;
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
    console.log(row.numeroReserva);
    this.reservaService.deleteReserva(row.numeroReserva).subscribe(
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
  onDateChange(event: Date): void {
    // Your custom function to be executed on date selection
    const formatedDate = this.datePipe.transform(event, 'yyyy-MM-dd');
    console.log(formatedDate);
    const datatmp = {
      fecha:this.datePipe.transform(event, 'yyyy-MM-dd')
    }
    this.reservaService.getHoras(datatmp).subscribe((data) => {
      this.horasDisponibles = data.horas;
      console.log(data);
    });
    // Add your custom logic here
  }

}
