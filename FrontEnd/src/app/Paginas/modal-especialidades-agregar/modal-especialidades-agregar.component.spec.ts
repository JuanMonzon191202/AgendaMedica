import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspecialidadesAgregarComponent } from './modal-especialidades-agregar.component';

describe('ModalEspecialidadesAgregarComponent', () => {
  let component: ModalEspecialidadesAgregarComponent;
  let fixture: ComponentFixture<ModalEspecialidadesAgregarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEspecialidadesAgregarComponent]
    });
    fixture = TestBed.createComponent(ModalEspecialidadesAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
