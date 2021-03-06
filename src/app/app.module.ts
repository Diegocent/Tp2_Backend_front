import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRestauranteComponent } from './components/add-restaurante/add-restaurante.component';
import { RestauranteDetailsComponent } from './components/restaurante-details/restaurante-details.component';
import { RestaurantesListComponent } from './components/restaurante-list/restaurante-list.component';
import { ReservasListComponent } from './components/reservas-list/reservas-list.component';
import { AddReservaComponent } from './components/add-reserva/add-reserva.component';
import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { SigmaComponent } from './components/sigma/sigma.component';
import {GraficoMesasComponent} from "./components/grafico-mesas/grafico-mesas.component";
import { GestionConsumoComponent } from './components/gestion-consumo/gestion-consumo.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
    declarations: [
        AppComponent,
        AddRestauranteComponent,
        RestauranteDetailsComponent,
        RestaurantesListComponent,
        ReservasListComponent,
        AddReservaComponent,
        AddClienteComponent,
        SigmaComponent,
        GraficoMesasComponent,
        GestionConsumoComponent,
        PopupComponent
    ],
    entryComponents:[
      PopupComponent
    ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
