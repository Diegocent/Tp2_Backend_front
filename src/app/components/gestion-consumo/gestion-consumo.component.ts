import {Component, OnInit} from '@angular/core';
import {ReservaService} from "../../services/reserva.service";
import {MesaService} from "../../services/mesa.service";
import {RestauranteService} from "../../services/restaurante.service";
import {HttpClient} from "@angular/common/http";
import {PdfService} from "../../services/pdf.service";

interface restaurante {
  id: number
  nombre: string
  direccion: string
  createdAt: string
  updatedAt: string
}

interface mesa {
  id: number
  nombre: string
  posicionx: number
  posiciony: number
  planta: number
  capacidad: number
  createdAt: string
  updatedAt: string
  RestauranteId: number
}

@Component({
  selector: 'app-gestion-consumo',
  templateUrl: './gestion-consumo.component.html',
  styleUrls: ['./gestion-consumo.component.css']
})
export class GestionConsumoComponent implements OnInit {
  baseUrl: string = 'http://localhost:9090/api/cabecera_consumo'
  submitted = false
  restaurantes: restaurante[] = []
  restauranteSeleccionado: number
  mesas: mesa[] = []
  mesaSeleccionada: number
  // fecha elegida
  fecha: Date
  rangohoras = [
    {id: 1, name: '12 a 13'},
    {id: 2, name: '13 a 14'},
    {id: 3, name: '14 a 15'},
    {id: 4, name: '19 a 20'},
    {id: 5, name: '20 a 21'},
    {id: 6, name: '21 a 22'},
    {id: 7, name: '22 a 23'},
  ];
  // hora elegida
  hora: number


  constructor(private reservaService: ReservaService,
              private mesaService: MesaService,
              private restauranteService: RestauranteService,
              private http: HttpClient,
              private pdfService:PdfService) {
  }

  ngOnInit(): void {
    this.retrieveRestaurantes()
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

  retrieveMesas(): void {
    this.mesaService.getAll(this.restauranteSeleccionado, null)
      .subscribe(
        data => {
          this.mesas = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  seleccionarMesa() {
    console.log(this.fecha)
    console.log(this.hora)
    console.log(this.mesaSeleccionada)
  }

  obtenerCabecera() {
    this.http.get(`${this.baseUrl}/1`).subscribe((res) => {
      console.log(res)
    })
  }

  abrirMesa(id: number) {
    let body = {
      "estado": "abierto",
    }
    this.http.put(`${this.baseUrl}/${id}`, body).subscribe((res) => {
      console.log(res)
    })
  }

  cerrarMesa(id: number) {
    let body = {
      "estado": "cerrado",
    }
    this.http.put(`${this.baseUrl}/${id}`, body).subscribe((res) => {
      console.log(res)
    })
  }

  pdf(id: number) {
   this.pdfService.generarPdf()
  }


}
