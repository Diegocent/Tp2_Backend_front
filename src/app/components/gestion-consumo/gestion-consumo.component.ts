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
  mesaNumero: number
  mesaSeleccionada: any
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
  //si la mesa estadio esta abierta o cerrada
  abierto: boolean = false


  constructor(private reservaService: ReservaService,
              private mesaService: MesaService,
              private restauranteService: RestauranteService,
              private http: HttpClient,
              private pdfService: PdfService) {
  }

  ngOnInit(): void {
    this.retrieveRestaurantes()
  }


  retrieveRestaurantes(): void {
    this.restauranteService.getAll()
      .subscribe(
        data => {
          this.restaurantes = data;
          console.log('restaurantes: ', data);
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
          console.log('mesas: ', data);
        },
        error => {
          console.log(error);
        });
  }

  seleccionarMesa() {
    this.mesaService.get(this.mesaNumero).subscribe((res) => {
      this.mesaSeleccionada = res
      if (res.cabeceras_consumos.length === 0) {
        this.abierto = false
      } else {
        this.abierto = true
      }
    })
  }


  abrirMesa(id: number) {
    id = 2
    let body = {
      "estado": "abierto",
    }
    this.http.put(`${this.baseUrl}/${id}`, body).subscribe((res) => {
      console.log(res)
    })
  }

  cerrarMesa() {
    if (this.abierto === true) {
      this.pdfService.generarPDF(this.mesaNumero)
      this.http.put(`${this.baseUrl}/cerrar/?MesaId=${this.mesaSeleccionada.id}`, {}).subscribe((res) => {
        console.log(res)
      })
    } else {
      console.log('mesa ya cerrada o no seleccionada')
    }
  }

  pdf() {
    // si ya se cerro
    if (this.abierto === true) {
      this.pdfService.generarPDF(this.mesaNumero)
    } else {
      console.log('mesa ya cerrada o no seleccionada')
    }

  }


}
