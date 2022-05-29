import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteDetailsComponent } from './restaurante-details.component';

describe('RestauranteDetailsComponent', () => {
  let component: RestauranteDetailsComponent;
  let fixture: ComponentFixture<RestauranteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestauranteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
