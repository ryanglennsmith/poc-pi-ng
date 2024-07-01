import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitiesPageComponent } from './quantities-page.component';

describe('QuantitiesPageComponent', () => {
  let component: QuantitiesPageComponent;
  let fixture: ComponentFixture<QuantitiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitiesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
