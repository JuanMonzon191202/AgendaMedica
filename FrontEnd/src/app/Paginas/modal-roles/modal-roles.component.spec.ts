import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRolesComponent } from './modal-roles.component';

describe('ModalRolesComponent', () => {
  let component: ModalRolesComponent;
  let fixture: ComponentFixture<ModalRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRolesComponent]
    });
    fixture = TestBed.createComponent(ModalRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
