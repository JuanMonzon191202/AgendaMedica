import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoEspecialistasComponent } from './catalogo-especialistas.component';

describe('CatalogoEspecialistasComponent', () => {
  let component: CatalogoEspecialistasComponent;
  let fixture: ComponentFixture<CatalogoEspecialistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoEspecialistasComponent]
    });
    fixture = TestBed.createComponent(CatalogoEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
