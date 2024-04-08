import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReservaService } from './reserva.service';

export interface Reserva{
  fecha:string;
  horas_disponibles: string[];
  mensaje:string;
}

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  reserva:Reserva;

  constructor(private reservaService:ReservaService) { }

  ngOnInit(): void {
  }
  selectedDate: Date;
  minDate = new Date(); // Today's date as minimum selectable date
  selected: Date | null;
  reservation:boolean;

  onDateChange(event : Event) {
   // this.selectedDate = new Date(dateStr);
  }

  makeReservation() {
    // Implement logic to handle reservation based on selectedDate
    console.log("Reservation requested for:", this.selectedDate);
    this.reservation= true;
    // You can make an API call, show a confirmation message etc. here
    this.getReserva();
  }

  getReserva(){
    this.reservaService.getReserva().subscribe((data) => {
      this.reserva =data.reserva;
    });
    console.log(this.reserva);
  }


}
