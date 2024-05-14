import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaAdminComponent } from './reserva-admin/reserva-admin.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [

  { path: 'adminreserva', component: ReservaAdminComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'restablecer', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
