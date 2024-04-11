import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports:[ReactiveFormsModule,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('verificar envio de menu', () => {
    const menucomponent =fixture.componentInstance;
    let plato= menucomponent.formulario.controls['platoPrincipal'];
    let postre = menucomponent.formulario.controls['postres'];
    let bebida = menucomponent.formulario.controls['bebidas'];

    plato.setValue('');
    postre.setValue('');
    bebida.setValue('');
    
    expect(menucomponent.getRecomendation()).toBe();
  });
});
