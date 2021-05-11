import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibriConServizioComponent } from './libri-con-servizio.component';

describe('LibriConServizioComponent', () => {
  let component: LibriConServizioComponent;
  let fixture: ComponentFixture<LibriConServizioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibriConServizioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibriConServizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
