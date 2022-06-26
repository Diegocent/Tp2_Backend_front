import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
interface Cliente{
  cedula: string
  nombre: string
  apellido: string
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private cliente:{
    cedula: string
    nombre: string
    apellido: string
  }, private clienteService: ClienteService, private matDialogRef: MatDialogRef<PopupComponent>) { }
  cliente1:Cliente ={cedula:'',nombre:'',apellido:''}
  ngOnInit() {

  }


  saveCliente(): void {
    console.log(this.cliente1)
    const data = {
      cedula: this.cliente1.cedula,
      nombre: this.cliente1.nombre,
      apellido: this.cliente1.apellido
    };

    this.clienteService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
     this.onCloseClick()
  }
  onCloseClick(){
    this.matDialogRef.close();
  }
}
