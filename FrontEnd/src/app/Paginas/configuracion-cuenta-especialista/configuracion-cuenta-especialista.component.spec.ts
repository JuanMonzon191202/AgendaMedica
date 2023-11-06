import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionCuentaEspecialistaComponent } from './configuracion-cuenta-especialista.component';

describe('ConfiguracionCuentaEspecialistaComponent', () => {
  let component: ConfiguracionCuentaEspecialistaComponent;
  let fixture: ComponentFixture<ConfiguracionCuentaEspecialistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionCuentaEspecialistaComponent]
    });
    fixture = TestBed.createComponent(ConfiguracionCuentaEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
