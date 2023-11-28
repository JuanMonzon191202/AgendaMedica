import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspecialidadesComponent } from './modal-especialidades.component';

describe('ModalEspecialidadesComponent', () => {
  let component: ModalEspecialidadesComponent;
  let fixture: ComponentFixture<ModalEspecialidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEspecialidadesComponent]
    });
    fixture = TestBed.createComponent(ModalEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
