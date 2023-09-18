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
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { CommonModule, Time } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SnackbarService } from '../snackbarservice';

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
  availableTimes: Time[] = [] as Time[];
  time_placeholder: string = "Seleccionar Doctor primero"

  constructor(
    public dialogRef: MatDialogRef<CreateReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      reservation: Reservation,
      availableDoctors: Person[],
      patients: Person[],
      availableTimes: Time[],
      existingReservations: Reservation[]
    },
    private snackBar: SnackbarService
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  //TODO: no verifica datos vacios
  accept(): void {
    const values = Object.values(this.data);
    if (values.length === 0 || values.some((value) => !value)) {
      this.snackBar.open('Por favor, rellene todos los campos');
      return;
    }
    this.dialogRef.close(this.data);
  }

  filterTimes(): void {
    let reservation = this.data.reservation;
    if (!reservation.doctor) {
      this.time_placeholder = "Seleccionar Doctor primero"
    } else if (!reservation.patient) {
      this.time_placeholder = "Seleccionar Paciente primero"
    } else if (!reservation.date) {
      this.time_placeholder = "Seleccionar Fecha primero"
    } else {
      this.time_placeholder = "Seleccion Hora";
      this.availableTimes = this.data.availableTimes.filter((x: Time) =>
        this.data.existingReservations.find((res: Reservation) =>
          (
            res.date.getFullYear() == this.data.reservation.date.getFullYear() &&
            res.date.getMonth() == this.data.reservation.date.getMonth() &&
            res.date.getDay() == this.data.reservation.date.getDay() &&
            res.doctor.id == this.data.reservation.doctor.id &&
            res.time.hours == x.hours
          ) || (
            res.date.getFullYear() == this.data.reservation.date.getFullYear() &&
            res.date.getMonth() == this.data.reservation.date.getMonth() &&
            res.date.getDay() == this.data.reservation.date.getDay() &&
            res.patient.id == this.data.reservation.patient.id &&
            res.time.hours == x.hours
          )
        ) === undefined
      );
      if (this.availableTimes.length == 0) {
        this.time_placeholder = "No existen horarios para esta configuración."
      }
    }
  }
}
