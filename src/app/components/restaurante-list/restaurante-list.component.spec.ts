import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteListComponent } from './restaurante-list.component';

describe('RestauranteListComponent', () => {
  let component: RestauranteListComponent;
  let fixture: ComponentFixture<RestauranteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestauranteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
