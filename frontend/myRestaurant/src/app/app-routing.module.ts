import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaAdminComponent } from './reserva-admin/reserva-admin.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { path: 'adminreserva', component: ReservaAdminComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
