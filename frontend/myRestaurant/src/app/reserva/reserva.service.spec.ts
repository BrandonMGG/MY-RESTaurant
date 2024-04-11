import { TestBed } from '@angular/core/testing';
import { ReservaService } from './reserva.service';
import { HttpClientModule } from '@angular/common/http';

describe('ReservaService', () => {
  let service: ReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ], providers: [ReservaService]
    });
    service = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Verificar Get Reserva', (done) => {
    let reserva = {
      mensaje: 'me gustaria un jueves',
      fecha: '20/10/2024',
    }
    service.getReserva(reserva).subscribe(data => {
      expect(JSON.stringify(data)).toEqual(JSON.stringify({disponible:false, mensaje:"Fecha no válida"}));
      done();
    });
  });
});
