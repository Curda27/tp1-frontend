import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Reservation, Person, Category, MedicalRecord } from '../models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SnackbarService } from '../snackbarservice';

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
    CommonModule,
    MatDatepickerModule,
  ],
})
export class CreateRecordComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      availableDoctors: Person[],
      patients: Person[],
      existingReservations: Reservation[],
      allCategories: Category[],
      medicalRecord: MedicalRecord,
    },
    private snackBar: SnackbarService
  ) { }

  compareDoctors(doctor1: Person, doctor2: Person): boolean {
    if (!doctor1 || !doctor2) return false;
    else return doctor1.id === doctor2.id;

  }

  comparePacients(pacient1: Person, pacient2: Person): boolean {
    if (!pacient1 || !pacient2) return false;
    else return pacient1.id === pacient2.id;

  }

  cancel(): void {
    this.dialogRef.close();
  }

  accept(): void {
    const medicalRecord = this.data.medicalRecord;

    if (!medicalRecord.category || !medicalRecord.date || !medicalRecord.diagnostic || !medicalRecord.doctor || !medicalRecord.patient || !medicalRecord.reason) {
      this.snackBar.open('Por favor, rellene todos los campos');
      return;
    }
    this.dialogRef.close(this.data.medicalRecord);
  }

  fillMedicalRecord(): void {
    let medicalRecord = this.data.medicalRecord;

    if (medicalRecord.patient) {
      const availableReservation = this.data.existingReservations.filter(
        (res: Reservation) => res.patient.id === medicalRecord.patient.id && res.id != -1
      );

      const matchingReservation = availableReservation.sort((a: Reservation, b: Reservation) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        if (aDate.getFullYear() != bDate.getFullYear()) {
          return aDate.getFullYear() - bDate.getFullYear();
        } else if (aDate.getMonth() != bDate.getMonth()) {
          return aDate.getMonth() - bDate.getMonth();
        } else if (aDate.getDate() != bDate.getDate()) {
          return aDate.getDate() - bDate.getDate();
        } else if (a.time.hours != b.time.hours) {
          return a.time.hours - b.time.hours;
        } else {
          return a.time.minutes - b.time.minutes;
        }
      })[0];

      if (matchingReservation) {
        medicalRecord = {
          patient: matchingReservation.patient,
          doctor: matchingReservation.doctor,
          date: matchingReservation.date,
          id: matchingReservation.id,
          category: null as any,
          diagnostic: null as any,
          reason: null as any,
        };
        this.data.medicalRecord = medicalRecord;

      } else {
        medicalRecord = {
          patient: medicalRecord.patient,
          doctor: null as any,
          date: null as any,
          id: null as any,
          category: null as any,
          diagnostic: null as any,
          reason: null as any,
        };
        this.data.medicalRecord = medicalRecord;
      }
    }
  }
}
