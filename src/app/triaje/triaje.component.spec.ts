import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriajeComponent } from './triaje.component';

describe('TriajeComponent', () => {
  let component: TriajeComponent;
  let fixture: ComponentFixture<TriajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TriajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
