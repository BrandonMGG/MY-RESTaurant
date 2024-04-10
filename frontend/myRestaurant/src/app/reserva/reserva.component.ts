import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReservaService } from './reserva.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  reserva: Reserva;
  form: FormGroup;
  constructor(private reservaService: ReservaService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
        mensaje: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }
  selectedDate: Date;
  minDate = new Date();
  selected: Date | null;
  reservation: boolean;



  onDateChange(event: Event) {

  }

  makeReservation() {
   // console.log("Reservation requested for:", this.selectedDate);
    this.reservation = true;
    this.getReserva();
  }

  getReserva() {
    const data = {
      mensaje: "Me aaaaaaa",
      fecha: "" 
    };
    console.log(data);
    this.reservaService.getReserva(data).subscribe({
      next: (data) => {
        this.reserva = data;
      },
      error: (error) => {
        console.error('Error getting reservation:', error);
      }
    });
    console.log(this.reserva);
  }


}
