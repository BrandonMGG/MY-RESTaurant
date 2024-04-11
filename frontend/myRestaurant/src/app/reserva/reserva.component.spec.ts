import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaComponent } from './reserva.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

describe('ReservaComponent', () => {
  let component: ReservaComponent;
  let fixture: ComponentFixture<ReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaComponent ],
      imports:[ReactiveFormsModule,HttpClientModule],
      providers:[DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('verificar envio de reserva', () => {
    const reservaComponent =fixture.componentInstance;
    let mensaje= reservaComponent.form.controls['mensaje'];
    let selected = reservaComponent.formattedDate;
    selected = '2024-04-20'
    mensaje.setValue('Me gustaria un fin de semana');
    expect(reservaComponent.makeReservation()).toBe();
  });

  it('verificar fecha de reserva', () => {
    const reservaComponent =fixture.componentInstance;
    let mensaje= reservaComponent.form.controls['mensaje'];
    let selected = reservaComponent.formattedDate;
    selected = '2024-04-20'
    mensaje.setValue('Me gustaria un fin de semana');
    expect(reservaComponent.getReserva()).toBe();
  });
});
