import { Component, OnInit } from '@angular/core';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurante-details',
  templateUrl: './restaurante-details.component.html',
  styleUrls: ['./restaurante-details.component.css']
})
export class RestauranteDetailsComponent implements OnInit {
  currentRestaurante = null;
  message = '';

  constructor(
    private restauranteService: RestauranteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getRestaurante(this.route.snapshot.paramMap.get('id'));
  }

  getRestaurante(id): void {
    this.restauranteService.get(id)
      .subscribe(
        data => {
          this.currentRestaurante = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  /* updatePublished(status): void {
    const data = {
      title: this.currentRestaurante.title,
      description: this.currentRestaurante.description,
      published: status
    };

    this.restauranteService.update(this.currentRestaurante.id, data)
      .subscribe(
        response => {
          this.currentRestaurante.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  } */

  updateRestaurante(): void {
    this.restauranteService.update(this.currentRestaurante.id, this.currentRestaurante)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The Restaurante was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteRestaurante(): void {
    this.restauranteService.delete(this.currentRestaurante.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/restaurantes']);
        },
        error => {
          console.log(error);
        });
  }
}
