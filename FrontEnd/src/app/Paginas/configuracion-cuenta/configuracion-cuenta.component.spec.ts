import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionCuentaComponent } from './configuracion-cuenta.component';

describe('ConfiguracionCuentaComponent', () => {
  let component: ConfiguracionCuentaComponent;
  let fixture: ComponentFixture<ConfiguracionCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionCuentaComponent]
    });
    fixture = TestBed.createComponent(ConfiguracionCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
