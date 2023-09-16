import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Reservation, Person } from '../models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, Time } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
  ],
})
export class CreateReservationComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      reservation: Reservation,
      availableDoctors: Person[],
      patients: Person[],
      availableTimes: Time[],
    }
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
