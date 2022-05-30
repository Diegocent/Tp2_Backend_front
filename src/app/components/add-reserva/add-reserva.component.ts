import { Component, OnInit } from '@angular/core';

import { ClienteService } from 'src/app/services/cliente.service';
import { MesaService } from 'src/app/services/mesa.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { RestauranteService } from 'src/app/services/restaurante.service';



@Component({
  selector: 'app-add-reserva',
  templateUrl: './add-reserva.component.html',
  styleUrls: ['./add-reserva.component.css']
})
export class AddReservaComponent implements OnInit {

  reserva = {
    ClienteId: null,
    RestauranteId: null,
    MesaId: null,
    fecha: null,
    rangohora: null,
    cantidad: null
  }
  cliente = {
    cedula: null,
    nombre: null,
    apellido: null
  }

  horas: number[];
  mesasreservadas;
  restaurantes;
  clientes;
  mesas;
  cedula;
  existe;
  findisponibles = false;
  p: number;

  rangohoras = [
    {id: 1, name: '12 a 13'},
    {id: 2, name: '13 a 14'},
    {id: 3, name: '14 a 15'},
    {id: 4, name: '19 a 20'},
    {id: 5, name: '20 a 21'},
    {id: 6, name: '21 a 22'},
    {id: 7, name: '22 a 23'},
  ];

  rangoreserva = {
    1: "12 a 13",
    2: "13 a 14",
    3: "14 a 15",
    4: "19 a 20",
    5: "20 a 21",
    6: "21 a 22",
    7: "22 a 23"
  }
  submitted = false;


  constructor(private reservaService: ReservaService, private restauranteService: RestauranteService, private clienteService: ClienteService, private mesaService: MesaService) { }

  ngOnInit(): void {
    this.retrieveRestaurantes();
    this.retrieveClientes();
    this.refreshList();
    this.mesasreservadas=null;
    this.mesas=null;
    this.cedula=null;
    this.existe=true;
  }

  refreshList(): void {
    this.mesas = null;
    this.mesasreservadas = null;

  }

  findmesasdisponibles(restaurante, fecha, horas): void {
    this.findisponibles = true;
    this.retrieveReservas(restaurante, fecha, horas);
  }

  findCliente(): void {
    this.retrieveClientes();
    console.log(this.cedula);
    this.clienteService.checkCedula(this.cedula)
      .subscribe(
        data => {
          this.existe = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveReservas(restaurante, fecha, horas): void {
    this.reservaService.getAll(restaurante, fecha, null, horas)
      .subscribe(
        data => {
          this.mesasreservadas = data;
          console.log(this.mesasreservadas);
          this.retrieveMesas();
        },
        error => {
          console.log(error);
        });
  }

  retrieveRestaurantes(): void {
    this.restauranteService.getAll()
      .subscribe(
        data => {
          this.restaurantes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveClientes(): void {
    this.clienteService.getAll(this.cedula)
      .subscribe(
        data => {
          this.clientes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveMesas(): void {
    console.log("mesas: ", this.mesasreservadas);
    console.log("leng: ",this.mesasreservadas.length);
    if (this.mesasreservadas.length === 0) {
      this.mesaService.getAll(this.reserva.RestauranteId, null)
      .subscribe(
        data => {
          this.mesas = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    } else {
      this.mesaService.getAll(this.reserva.RestauranteId, this.mesasreservadas)
      .subscribe(
        data => {
          this.mesas = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    }

  }

  saveReserva(): void {
    this.refreshList();
    this.horas.forEach( hora => {
      const data = {
        fecha: this.reserva.fecha,
        rangohora: hora,
        cantidad: this.reserva.cantidad,
        ClienteId: this.reserva.ClienteId,
        RestauranteId: this.reserva.RestauranteId,
        MesaId: this.reserva.MesaId
      };
      console.log(data);
      this.reservaService.create(data)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
          },
          error => {
            console.log(error);
          });
    });

  }

  newReserva(): void {
    this.findisponibles = false;
    this.submitted = false;
    this.reserva = {
      fecha: null,
      rangohora: null,
      cantidad: null,
      ClienteId: null,
      RestauranteId: null,
      MesaId: null
    };
    this.horas = null;
  }

  saveCliente(): void {
    const data = {
      cedula: this.cliente.cedula,
      nombre: this.cliente.nombre,
      apellido: this.cliente.apellido
    };

    this.clienteService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  newCliente(): void {
    this.cliente = {
      cedula: '',
      nombre: '',
      apellido: ''
    };
  }

}
