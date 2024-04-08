import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  constructor() { }

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
  }



}
