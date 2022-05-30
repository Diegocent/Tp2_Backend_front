import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit {

  reservas: Reserva[];
  restaurantes;
  clientes;
  p: number;
  currentReserva = null;
  currentIndex = -1;

  filtros= {
    restaurante: null,
    fecha: null,
    cliente: null
  }
  rangoreserva = {
    1: "12 a 13",
    2: "13 a 14",
    3: "14 a 15",
    4: "19 a 20",
    5: "20 a 21",
    6: "21 a 22",
    7: "22 a 23"
  }
  constructor(private reservaService: ReservaService, private restauranteService: RestauranteService, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.retrieveReservas();
    this.retrieveRestaurantes();
    this.retrieveClientes();
  }

  filtrar(): void{
    console.log(this.filtros);
    this.retrieveReservas();
  }

  limpiar(): void{
    this.filtros.restaurante=null;
    this.filtros.fecha=null;
    this.filtros.cliente=null;
    this.retrieveReservas();
  }

  retrieveRestaurantes(): void {
    this.restauranteService.getAll()
      .subscribe(
        data => {
          this.restaurantes = data;
          console.log('restaurantes: ',data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveClientes(): void {
    this.clienteService.getAll(null)
      .subscribe(
        data => {
          this.clientes = data;
          console.log('clientes: ',data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveReservas(): void {
    this.reservaService.getAll(this.filtros.restaurante, this.filtros.fecha, this.filtros.cliente, null)
      .subscribe(
        data => {
          this.reservas = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveReservas();
    this.currentReserva = null;
    this.currentIndex = -1;
  }

  setActiveReserva(reserva, index): void {
    this.currentReserva = reserva;
    this.currentIndex = index;
  }

  removeAllReservas(): void {
    this.reservaService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveReservas();
        },
        error => {
          console.log(error);
        });
  }
}
