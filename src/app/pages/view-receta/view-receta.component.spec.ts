import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecetaComponent } from './view-receta.component';

describe('ViewRecetaComponent', () => {
  let component: ViewRecetaComponent;
  let fixture: ComponentFixture<ViewRecetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRecetaComponent]
    });
    fixture = TestBed.createComponent(ViewRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
