import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRolesCreateComponent } from './modal-roles-create.component';

describe('ModalRolesCreateComponent', () => {
  let component: ModalRolesCreateComponent;
  let fixture: ComponentFixture<ModalRolesCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRolesCreateComponent]
    });
    fixture = TestBed.createComponent(ModalRolesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
