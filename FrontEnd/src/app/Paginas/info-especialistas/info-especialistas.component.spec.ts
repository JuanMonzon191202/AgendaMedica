import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEspecialistasComponent } from './info-especialistas.component';

describe('InfoEspecialistasComponent', () => {
  let component: InfoEspecialistasComponent;
  let fixture: ComponentFixture<InfoEspecialistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoEspecialistasComponent]
    });
    fixture = TestBed.createComponent(InfoEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
