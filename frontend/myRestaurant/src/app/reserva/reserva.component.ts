import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReservaService } from './reserva.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

export interface Reserva {
  fecha: string;
  horas_disponibles: string[];
  mensaje: string;
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
  espaciosDisponiblesArray: string[] = [
    "mesa 1",
    "mesa 2",
    "mesa 3",
    "mesa 4",
    "mesa 5",
    "mesa 6",
    "mesa 7",
    "mesa 8",
    "mesa 9",
    "mesa 10"
];
numeroDePersonas: number[] = [
  1,2,3,4,5,6,7,8,9,10
];
horasDisponibles: string[]=[
  '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
];


  constructor(private reservaService: ReservaService, private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.form = this.formBuilder.group({
      mensaje: ['', Validators.required]
    });
    this.reservacionForm = this.formBuilder.group({
      espacioReservado: ['', Validators.required],
      numeroPersonas: ['', Validators.required],
      horaReservacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  selectedDate: Date;
  minDate = new Date();
  selected: Date;
  selectedReservationDate:Date;
  reservation: boolean;

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
}
