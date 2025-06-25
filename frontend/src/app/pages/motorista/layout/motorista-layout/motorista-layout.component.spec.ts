import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristaLayoutComponent } from './motorista-layout.component';

describe('MotoristaLayoutComponent', () => {
  let component: MotoristaLayoutComponent;
  let fixture: ComponentFixture<MotoristaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoristaLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotoristaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
