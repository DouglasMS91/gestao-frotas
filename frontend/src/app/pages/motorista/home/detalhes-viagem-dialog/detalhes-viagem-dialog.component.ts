import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalhes-viagem-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './detalhes-viagem-dialog.component.html',
  styleUrls: ['./detalhes-viagem-dialog.component.css']
})
export class DetalhesViagemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DetalhesViagemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosViagem: any
  ) {}

  fechar() {
    this.dialogRef.close();
  }
}
