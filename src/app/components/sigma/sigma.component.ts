// sigma.component.ts
import {Component, OnInit} from '@angular/core';
import sigma from 'sigma';

import { MesaService } from 'src/app/services/mesa.service';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-sigma',
  templateUrl: './sigma.component.html',
  styleUrls: ['./sigma.component.css'],
})
export class SigmaComponent implements OnInit {
  declare private sigma: any;

  private graph = {
    nodes: [
      {id: "p1", label: "Planta 1", x: 0, y: 0, size: 2, color: '#000000'},
      {id: "p2", label: "Planta 1", x: 0, y: 5, size: 2, color: '#000000'}
      /* {id: "n0", label: "A node", x: 0, y: 0, size: 3, color: '#008cc2'},
      {id: "n1", label: "Another node", x: 3, y: 1, size: 2, color: '#00FF00'},
      {id: "n2", label: "And a last one", x: 1, y: 3, size: 1, color: '#E57821'} */
    ],
    edges: [
      {id: "e0", source: "p1", target: "p2", color: '#000000', type: 'line', size: 1}
    ]
  };
  private grafos = [
    
  ];
  private colores = [
    '#008cc2',
    '#1E90FF',
    '#00FF00',
    '#008cc2'
  ];
  private planta = [
    'Planta 0',
    'Planta 1',
    'Planta 2',
    'Planta 3',
    'Planta 4',
    'Planta 5',
    'Planta 6'
  ];
  mesas;
  varios;
  restaurante;
  restaurantes;
  cantidad;
  plantas;

  constructor(private mesaService: MesaService, private restauranteService: RestauranteService) {

  }

  ngOnInit() {
    this.varios=false;
    this.retrieveRestaurantes();
  }
  
  filtrar(): void {
    this.retrieveMesas(this.restaurante);
  }

  dibujar(): void {
    
    /* this.grafos.forEach(graph => {
       */
      this.sigma = new sigma(
        {
          renderer: {
            container: document.getElementById("sigma-container"),
            type: 'canvas'
          },
          settings: {}
        }
      );
      /* this.sigma.graph.read(graph); */
      this.sigma.graph.read(this.graph);
      this.sigma.refresh();
      console.log(this.sigma)
      
    /* }); */
    console.log(this.sigma);
  }

  getPlantasR(): void {
    var mesass=[];
    this.mesas.forEach(mesa => {
      if(mesass.indexOf(mesa.planta)<0){
        mesass.push(mesa.planta);
      }
    });
    this.plantas = mesass.length;
    console.log("cantidad de plantas", this.plantas);
  }

  retrieveMesas(restaurante): void {
    this.mesaService.getAll(restaurante, null)
      .subscribe(
        data => {
          this.mesas = data;
          this.cantidad = this.mesas.length;
          this.getPlantasR();
          this.createMesasDraw();
        },
        error => {
          console.log(error);
        });
  }

  createMesasDraw(): void {
    var anterior=1;
    var mayorx=0;
    var mayory=0;
    var salto = 0;
    this.mesas.forEach(mesa => {
      console.log("actual",mesa.nombre);
      console.log("posx", mesa.posicionx+salto);
      if ((mesa.posicionx + salto)>mayorx) {
        mayorx = mesa.posicionx + salto;
      }
      if (mesa.posiciony>mayory) {
        mayory=mesa.posiciony;
      }
      if (anterior != mesa.planta) {
        console.log("cambio de planta");
        console.log("maxx", mayorx);
        console.log(this.graph.nodes);
        if(salto>0){mayorx= mesa.posicionx + mayorx + 0.2}
        this.graph.nodes.push({id: "s1"+mesa.planta, label: this.planta[mesa.planta], x: (mayorx+0.2), y: 0, size: 2, color: '#000000'});
        this.graph.nodes.push({id: "s2"+mesa.planta, label: this.planta[mesa.planta], x: (mayorx+0.2), y: (mayory+1), size: 2, color: '#000000'});
        this.graph.edges.push({id: "e1"+mesa.planta, source: "s1"+mesa.planta, target: "s2"+mesa.planta, color: '#000000', type: 'line', size: 1});
        salto = mayorx;
        console.log(salto);
      }
      this.graph.nodes.push({id: mesa.id, label: mesa.nombre, x: (mesa.posicionx+salto), y: mesa.posiciony, size: mesa.capacidad, color: this.colores[mesa.planta]});
      anterior = mesa.planta;
    });
    this.dibujar();
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

}

/* createMesasDraw(): void {
  for (let index = 1; index <= 2; index++) {
    var newgrafo={
      nodes: []
    };
    this.mesas.forEach(mesa => {
      //if (mesa.planta == index) {
        //newgrafo.nodes.push({id: mesa.id, label: mesa.nombre, x: mesa.posicionx, y: mesa.posiciony, size: mesa.capacidad, color: this.colores[index-1]});
        this.graph.nodes.push({id: mesa.id, label: mesa.nombre, x: mesa.posicionx*(mesa.planta), y: mesa.posiciony, size: mesa.capacidad, color: this.colores[mesa.planta]});
      //}
    });
    //this.grafos.push(newgrafo);
  //}
  if (this.grafos.length>1) {
    this.varios=true;
  }
  this.dibujar();
} */