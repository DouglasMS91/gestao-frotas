import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesViagemDialogComponent } from './detalhes-viagem-dialog.component';

describe('DetalhesViagemDialogComponent', () => {
  let component: DetalhesViagemDialogComponent;
  let fixture: ComponentFixture<DetalhesViagemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesViagemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesViagemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
