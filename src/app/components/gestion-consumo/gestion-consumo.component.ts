import {Component, OnInit} from '@angular/core';
import {ReservaService} from "../../services/reserva.service";
import {MesaService} from "../../services/mesa.service";
import {RestauranteService} from "../../services/restaurante.service";
import {HttpClient} from "@angular/common/http";
import {PdfService} from "../../services/pdf.service";
import {Gestion_consumoService} from "../../services/gestion_consumo.service";
import {ProductosService} from "../../services/productos.service";
import { ClienteService } from 'src/app/services/cliente.service';
import { Detalle_consumoService } from 'src/app/services/detalle_consumo.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

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
  cabeceras_consumos: cabecera []
}

interface cabecera{
  id: number
  estado: string
  total: number
  createdAt:string
  fecha_y_hora_creacion:string
  fecha_y_hora_cierre: string
  updatedAt: string
  MesaId: number
  ClienteId: number
  detalles_consumos: detalle_consumo []
}
interface producto{
  id:number
  nombre:string
  precio_venta: number
  createdAt: string
  updatedAt: string
  CategoriaumId: number
  CategoriaId: number
}
interface cliente{
    cedula: string
    nombre: string
    apellido: string
}
interface detalle_consumo{
  id: number
  ProductoId: number
  CabeceraConsumoId: number
  cantidad: number
  Producto: Producto
}

interface Producto{
  id: number
  nombre: string
  precio_venta: number
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
  cabeceras: cabecera[]=[]
  productoSeleccionado: number
  productos: producto[]=[]
  clientes: cliente[] =[]
  clienteSeleccionado: number
  cliente: cliente
  detalles: detalle_consumo[] = []
  mesaconsumo: mesa
  cantidad: number
  // fecha elegida
  mostrar: Boolean
  fecha: Date
  total:number
  clientenuevo : Boolean
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
              private pdfService: PdfService,
              private gestion_consumoService: Gestion_consumoService,
              private productosService: ProductosService,
              private clienteService: ClienteService,
              private detalleConsumoService: Detalle_consumoService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.retrieveRestaurantes()
    this.abierto=false
  }

  abrirDialogo(){
    let dialogRef= this.matDialog.open(PopupComponent)
    dialogRef.afterClosed().subscribe(result=>{
    this.mostrarCabecera()
    this.mostrarProductos()
  });
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
    console.log(this.mesaNumero)
    this.mesaService.get(this.mesaNumero).subscribe((res) => {
      this.mesaSeleccionada = res
      console.log(res.cabeceras_consumos.length)
      if (res.cabeceras_consumos.length === 0) {
        this.detalles = []
        this.clienteSeleccionado = 1
        this.productoSeleccionado=1
        this.cabeceras=[]
        this.total=0
        this.mostrar=false
      } else {
        this.abierto = true
        this.mostrarCabecera()
      }
    })
    this.mostrarProductos()
  }


  cargarMesa(){
    console.log(this.mesaNumero,this.clienteSeleccionado)
    let data={
      'MesaId': this.mesaNumero,
      'ClienteId': this.clienteSeleccionado,
      'estado': 'abierto'
    }
    this.gestion_consumoService.create(data).subscribe(
      response => {
        console.log(response);
        this.abierto=true;
        this.mostrarCabecera();
      },
      error => {
        console.log(error);
      });
  }

  abrirMesa(id: number) {
    id = 1
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
        this.abierto=false
        this.clienteSeleccionado = 0
        this.productoSeleccionado = 0
        this.cabeceras=[]
        this.detalles = []
        this.total=0
        this.mostrar=false
        setTimeout( function() { window.location.href = "http://localhost:4200/gestion-consumo"; }, 1000 );
      });
    } else {
      console.log('mesa ya cerrada o no seleccionada')
    }
    // window.location.reload();

  }
  mostrarProductos(){
    this.clienteService.getAll(null).subscribe(
      data => {
        this.clientes = data;
        console.log('clientes ', data);
      },
      error => {
        console.log(error);
      });
    this.productosService.getAll().subscribe(
      data => {
        this.productos = data;
        console.log('productos: ', data);
      },
      error => {
        console.log(error);
      });

  }
  saveCliente(){
    let data= {
      'cedula':this.cliente.cedula,
      'nombre':this.cliente.nombre,
      'apellido':this.cliente.apellido
    }
    this.clienteService.create(data).subscribe(response=> console.log(response))
    this.clientenuevo=false
  }

  MostrarAgregarCliente(){
    this.clientenuevo=true
  }

  actualizarCabecera(){
    let data={
      "ClienteId":this.clienteSeleccionado
    }
    this.gestion_consumoService.update(this.cabeceras[0].id,data).subscribe(respuesta=> console.log(respuesta))
  }

  mostrarCabecera(){

    console.log(this.mesaNumero)
    this.mesaService.get(this.mesaNumero).subscribe(
      data => {
        this.cabeceras = data.cabeceras_consumos;
        console.log('cabeceras ', data);
        console.log(this.cabeceras[0].estado)
      if(this.cabeceras[0].estado=='abierto'){
      this.mostrar=true
      this.clienteSeleccionado=this.cabeceras[0].ClienteId
      this.mesaService.get(this.mesaNumero).subscribe(
        data => {
          this.mesaconsumo = data
        console.log(this.mesaconsumo)
        this.detalles=this.mesaconsumo.cabeceras_consumos[0].detalles_consumos
        this.total=this.cabeceras[0].total
      }
      );
      }
      },
      error => {
        console.log(error);
      });
  }

  agregarProducto(){
    let data ={
    'ProductoId' : Number(this.productoSeleccionado),
    'CabeceraConsumoId': this.cabeceras[0].id,
    'cantidad' : this.cantidad
    }
    this.detalleConsumoService.create(data).subscribe(
      response => {
        console.log(response);
       this.mostrarCabecera()
      },
      error => {
        console.log(error);
      });
      this.cantidad=null
      this.productoSeleccionado=0
    console.log(data)

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
