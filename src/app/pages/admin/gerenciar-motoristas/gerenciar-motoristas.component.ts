import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormMotoristasComponent } from './form-motoristas/form-motoristas.component';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gerenciar-motoristas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule, 
  ],
  templateUrl: './gerenciar-motoristas.component.html',
  styleUrl: './gerenciar-motoristas.component.css'
})
export class GerenciarMotoristasComponent {
  constructor(private dialog: MatDialog){}

  openDialog() {
    this.dialog.open(FormMotoristasComponent, {
      width: '30%',
    });
  }
}
