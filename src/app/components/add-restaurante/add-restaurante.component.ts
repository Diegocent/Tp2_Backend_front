import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-add-restaurante',
  templateUrl: './add-restaurante.component.html',
  styleUrls: ['./add-restaurante.component.css']
})
export class AddRestauranteComponent implements OnInit {
  restaurante = {
    nombre: '',
    direccion: ''
  };
  submitted = false;

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit(): void {
  }

  saveRestaurante(): void {
    const data = {
      nombre: this.restaurante.nombre,
      direccion: this.restaurante.direccion
    };

    this.restauranteService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newRestaurante(): void {
    this.submitted = false;
    this.restaurante = {
      nombre: '',
      direccion: ''
    };
  }

}
