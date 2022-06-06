import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheDocumentComponent } from './recherche-document.component';

describe('RechercheDocumentComponent', () => {
  let component: RechercheDocumentComponent;
  let fixture: ComponentFixture<RechercheDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
