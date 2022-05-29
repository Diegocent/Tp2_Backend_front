import { Component, OnInit } from '@angular/core';

import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {

  

  Cliente = {
    cedula: '',
    nombre: '',
    apellido: ''
  };
  submitted = false;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    
  }


}