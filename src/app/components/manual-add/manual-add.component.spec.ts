import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAddComponent } from './manual-add.component';

describe('ManualAddComponent', () => {
  let component: ManualAddComponent;
  let fixture: ComponentFixture<ManualAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
