import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionConsumoComponent } from './gestion-consumo.component';

describe('GestionConsumoComponent', () => {
  let component: GestionConsumoComponent;
  let fixture: ComponentFixture<GestionConsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionConsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
