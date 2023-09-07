import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MedicalRecord } from '../models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class CreateRecordComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MedicalRecord
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  accept(): void {
    const values = Object.values(this.data);
    if (values.length === 0 || values.some((value) => !value)) {
      alert('Datos Incorrectos');
      return;
    }
    this.dialogRef.close(this.data);
  }
}
