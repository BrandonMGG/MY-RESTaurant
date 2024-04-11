import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        
      ]
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Verificar Get Menu', (done) => {
    service.getMenu().subscribe(data => {
      expect(JSON.stringify(data)).toBeTruthy();
      done();
    });
  });
  let comidas = {
    platoPrincipal: "Pasta con pesto",
    bebidas: "",
    postres:""
  }
  it('Verificar Get Recomendacion', (done) => {
    service.getRecomendation(comidas).subscribe(data => {
      expect(JSON.stringify(data)).toBeTruthy();
      done();
    });
  });
  let mensaje ={
    mensaje:"no me gusto"
  }
  it('Verificar Get Feedback', (done) => {
    service.postFeedback(mensaje).subscribe(data => {
      expect(JSON.stringify(data)).toBeTruthy();
      done();
    });
  });
});
