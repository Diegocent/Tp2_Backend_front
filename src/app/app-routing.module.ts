import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantesListComponent } from './components/restaurante-list/restaurante-list.component';
import { RestauranteDetailsComponent } from './components/restaurante-details/restaurante-details.component';
import { AddRestauranteComponent } from './components/add-restaurante/add-restaurante.component';
import { ReservasListComponent } from './components/reservas-list/reservas-list.component';
import { AddReservaComponent } from './components/add-reserva/add-reserva.component';
import { SigmaComponent } from './components/sigma/sigma.component';
import {GestionConsumoComponent} from "./components/gestion-consumo/gestion-consumo.component";

const routes: Routes = [
  { path: '', redirectTo: 'reservas', pathMatch: 'full' },
  { path: 'restaurantes', component: RestaurantesListComponent },
  { path: 'restaurantes/detalles/:id', component: RestauranteDetailsComponent },
  { path: 'restaurantes/add', component: AddRestauranteComponent },
  { path: 'reservas', component: ReservasListComponent },
  { path: 'reservas/add', component: AddReservaComponent },
  { path: 'planos', component: SigmaComponent },
  { path: 'gestion-consumo', component: GestionConsumoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
