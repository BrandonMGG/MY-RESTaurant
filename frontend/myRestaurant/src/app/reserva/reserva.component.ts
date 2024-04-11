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
  constructor(private reservaService: ReservaService, private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.form = this.formBuilder.group({
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  selectedDate: Date;
  minDate = new Date();
  selected: Date;
  reservation: boolean;


  makeReservation() {
    this.reservation = true;
    if (this.selected) {
      this.formattedDate = this.datePipe.transform(this.selected, 'yyyy-MM-dd');
    }
    this.getReserva();
  }

  getReserva() {
    if (this.formattedDate) {
      const datat = {
        mensaje: this.form.value.mensaje,
        fecha: this.formattedDate
      };
      this.reservaService.getReserva(datat).subscribe((data) => {
        this.reserva = data;
      });
    } else {
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
