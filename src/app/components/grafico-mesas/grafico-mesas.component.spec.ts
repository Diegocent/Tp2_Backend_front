import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoMesasComponent } from './grafico-mesas.component';

describe('GraficoMesasComponent', () => {
  let component: GraficoMesasComponent;
  let fixture: ComponentFixture<GraficoMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoMesasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
