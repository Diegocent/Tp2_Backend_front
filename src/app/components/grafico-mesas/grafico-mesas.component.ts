import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Surface, Path, Text, Group, geometry, Image} from "@progress/kendo-drawing";

const {transform} = geometry;
import {ElementRef, ViewChild} from "@angular/core";
import {AfterViewInit, OnDestroy} from "@angular/core";
import {Point, Rect, Size} from "@progress/kendo-drawing/geometry";

@Component({
  selector: 'app-grafico-mesas',
  templateUrl: './grafico-mesas.component.html',
  styleUrls: ['./grafico-mesas.component.css']
})
export class GraficoMesasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("surface")
  private surfaceElement: ElementRef;
  private surface: Surface;
  @Input() mesas: any = '';

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawScene(this.createSurface());
  }

  public ngAfterViewInit(): void {

  }

  public ngOnDestroy() {
    this.surface.destroy();
  }

  private createSurface(): Surface {
    // Obtain a reference to the native DOM element of the wrapper
    const element = this.surfaceElement.nativeElement;

    // Create a drawing surface
    this.surface = Surface.create(element);

    return this.surface;
  }

  drawScene(surface: Surface) {

    // Place all the shapes in a group
    const group = new Group();

    this.mesas.forEach((mesa) => {
      let imageRect = new Rect(
        new Point(mesa.posicion[0], mesa.posicion[1]),
        new Size(40, 40)
      );
      let imagen = new Image('/assets/icons/restaurant.png', imageRect);
      let capacidadMesa = new Text(mesa.capacidad, [parseInt(mesa.posicion[0])+15, parseInt(mesa.posicion[1])+40], {
        font: `bold 15px Arial`,
      });
      let nombreMesa = new Text(mesa.nombre, [parseInt(mesa.posicion[0]), parseInt(mesa.posicion[1])+60], {
        font: `bold 15px Arial`,
      });
      group.append(imagen, capacidadMesa, nombreMesa);
    })

    // Render the group on the surface
    surface.draw(group);
  }

}
