import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaAdminComponent } from './reserva-admin/reserva-admin.component';

const routes: Routes = [

  { path: 'adminreserva', component: ReservaAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
