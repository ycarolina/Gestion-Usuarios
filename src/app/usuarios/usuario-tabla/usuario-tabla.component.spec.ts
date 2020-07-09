import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTablaComponent } from './usuario-tabla.component';

describe('UsuarioTablaComponent', () => {
  let component: UsuarioTablaComponent;
  let fixture: ComponentFixture<UsuarioTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
