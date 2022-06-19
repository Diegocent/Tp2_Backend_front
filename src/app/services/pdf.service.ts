import {Injectable} from '@angular/core';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';
import {HttpClient} from "@angular/common/http";

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

interface Detalle {
  nombre: string
  cantidad: number
  precio: number
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  doc = new jsPDF() as jsPDFWithPlugin;
  cabecera: any
  detalles: Detalle[] = []

  constructor(private http: HttpClient) {
    this.obtenerCabecera()

  }

  obtenerCabecera() {
    this.http.get('http://localhost:9090/api/cabecera_consumo/1').subscribe((res) => {
      console.log('cabecera: ', res)
      this.cabecera = res
      this.procesarDetalles()
    })

  }

  generarPdf() {
    this.doc.autoTable(this.cabeceraOptions())
    console.log(this.calculateY(0))
    this.doc.autoTable(this.detallesOptions())
    this.doc.autoTable(this.totalOptions())
    this.doc.output("dataurlnewwindow")
  }

  cabeceraOptions() {
    return {
      body: [
        {titulo: 'Fecha', dato: this.cabecera.fecha_y_hora_cierre},
        {titulo: 'Cliente', dato: this.cabecera.Cliente.nombre + ' ' + this.cabecera.Cliente.apellido},
      ]
    }
  }

  detallesOptions() {
    return {
      columns: [
        { dataKey: 'nombre', header: 'Nombre' },
        { dataKey: 'cantidad', header: 'Cantidad' },
        { dataKey: 'precio', header: 'Precio' },
      ],
      body: this.detalles as any
    }
  }

  totalOptions() {
    return {
      body: [
        {titulo: 'Fecha', dato: this.cabecera.fecha_y_hora_cierre},
        {titulo: 'Cliente', dato: this.cabecera.Cliente.nombre + ' ' + this.cabecera.Cliente.apellido},
      ]
    }
  }

  calculateY(offset: number) {
    return (this.doc as any).lastAutoTable.finalY + offset
  }

  procesarDetalles() {
    let aux: Detalle
    // console.log('gestion: ', this.cabecera.detalles_consumos)
    for (let detalle of this.cabecera.detalles_consumos) {
      aux = {
        nombre: detalle.Producto.nombre,
        cantidad: detalle.cantidad,
        precio: detalle.Producto.precio_venta
      }
      this.detalles.push(aux)
    }
    console.log('detalles: ', this.detalles)
  }


}
