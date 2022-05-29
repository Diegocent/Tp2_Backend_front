import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-restaurante-list',
  templateUrl: './restaurante-list.component.html',
  styleUrls: ['./restaurante-list.component.css']
})
export class RestaurantesListComponent implements OnInit {

  restaurantes: any;
  currentRestaurante = null;
  currentIndex = -1;
  nombre = '';

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.retrieveRestaurantes();
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

  refreshList(): void {
    this.retrieveRestaurantes();
    this.currentRestaurante = null;
    this.currentIndex = -1;
  }

  setActiveRestaurante(restaurante, index): void {
    this.currentRestaurante = restaurante;
    this.currentIndex = index;
  }

  removeAllRestaurantes(): void {
    this.restauranteService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveRestaurantes();
        },
        error => {
          console.log(error);
        });
  }

  buscarNombre(): void {
    this.restauranteService.findAll(this.nombre)
      .subscribe(
        data => {
          this.restaurantes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}