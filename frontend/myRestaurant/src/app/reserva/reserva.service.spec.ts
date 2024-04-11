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
});
