import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';
import {HttpClient} from "@angular/common/http";
import {RestauranteService} from "./restaurante.service";
import {MesaService} from "./mesa.service";

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

interface Detalle {
  nombre: string
  cantidad: number
  precioUnitario: number
  precio: number
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  doc = new jsPDF() as jsPDFWithPlugin;
  cabecera: any
  mesa: any
  restaurante: any
  detalles: Detalle[] = []

  constructor(private http: HttpClient,
              private restauranteService: RestauranteService,
              private mesaService: MesaService) {
  }

  generarPDF(mesa: number) {
    //traer mesa
    this.mesaService.get(mesa).subscribe((res) => {
      this.mesa = res
      // restaurante
      this.restauranteService.get(this.mesa.RestauranteId).subscribe((restaurante) => {
        this.restaurante = restaurante
        // cabecera
        this.obtenerCabecera(this.mesa.cabeceras_consumos[0].id).subscribe((cabecera) => {
          this.cabecera = cabecera
          this.procesarDetalles()
          this.dibujarPDF()
          this.detalles = []
        })

      })

    })
  }


  obtenerCabecera(cabecera: number) {
    return this.http.get(`http://localhost:9090/api/cabecera_consumo/${cabecera}`)
  }


  procesarDetalles() {
    let aux: Detalle
    for (let detalle of this.cabecera.detalles_consumos) {
      aux = {
        nombre: detalle.Producto.nombre,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.Producto.precio_venta,
        precio: parseInt(detalle.cantidad) * parseInt(detalle.Producto.precio_venta)
      }
      this.detalles.push(aux)
    }
    console.log('los detalles son ',this.detalles)
  }

  dibujarPDF() {
    this.doc.setFontSize(18)
    this.doc.text(this.restaurante.nombre, 15, 15)
    this.doc.setFontSize(11)
    this.doc.text(this.restaurante.direccion, 15, 20)
    this.doc.text(this.mesa.nombre, 15, 25)
    this.doc.setFontSize(14)
    this.doc.autoTable(this.cabeceraOptions())
    this.doc.autoTable(this.detallesOptions())
    this.doc.autoTable(this.totalOptions())

    // @ts-ignore
    window.open(this.doc.output('bloburl', {
      filename: `ticket_${this.cabecera.id}`
    }));
  }

  cabeceraOptions() {
    const today = new Date(Date.now())
    return {
      body: [
        {titulo: 'Fecha', dato: today.toLocaleDateString()},
        {titulo: 'Cliente', dato: this.cabecera.Cliente.nombre + ' ' + this.cabecera.Cliente.apellido},
      ],
      startY: 35,
    }
  }

  detallesOptions() {
    return {
      columns: [
        {dataKey: 'nombre', header: 'Producto'},
        {dataKey: 'cantidad', header: 'Cantidad'},
        {dataKey: 'precioUnitario', header: 'Precio'},
        {dataKey: 'precio', header: 'Total'},
      ],
      body: this.detalles as any
    }
  }

  totalOptions() {
    return {
      columns: [
        {dataKey: 'total', header: 'Total (Gs)'},
      ],
      body: [
        {total: this.cabecera.total},
      ],
    }
  }


}
