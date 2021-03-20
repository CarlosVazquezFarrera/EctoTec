import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {TerminadoComponent} from './components/terminado/terminado.component'

const routes: Routes = [
  {path: 'registro', component: LoginComponent},
  {path: 'completo', component: TerminadoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'registro'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
