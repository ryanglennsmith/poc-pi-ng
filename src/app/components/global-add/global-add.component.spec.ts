import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAddComponent } from './global-add.component';

describe('GlobalAddComponent', () => {
  let component: GlobalAddComponent;
  let fixture: ComponentFixture<GlobalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
