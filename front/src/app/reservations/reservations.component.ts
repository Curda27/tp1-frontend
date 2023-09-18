import { Component, OnInit } from '@angular/core';
import { Category, Reservation, ReservationFilters, MedicalRecord } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from '../dialogs/create-reservation.component';
import { CreateRecordComponent } from '../dialogs/create-record.component';
import { Time } from "@angular/common";

@Component({
  selector: 'app-record',
  templateUrl: './reservations.component.html',
})
export class ReservationComponent implements OnInit {
  allReservation: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  categories: Category[] = [];

  tableFilters: ReservationFilters = {};

  constructor(public dialog: MatDialog) {
    // Remove time date from tableFilters dates
    this.tableFilters.dateFrom = new Date();
    this.tableFilters.dateTo = new Date();
    this.tableFilters.dateFrom.setHours(0, 0, 0, 0);
    this.tableFilters.dateTo.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.refreshList();
    this.filter();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: '380px',
      data: {
        reservation: {} as Reservation,
        availableDoctors: JSON.parse(localStorage.getItem('persons') ?? '[]').filter((person: any) => person.flag_is_doctor),
        patients: JSON.parse(localStorage.getItem('persons') ?? '[]').filter((person: any) => !person.flag_is_doctor),
        availableTimes: [
          {hours: 9, minutes: 0},
          {hours: 10, minutes: 0},
          {hours: 11, minutes: 0},
          {hours: 12, minutes: 0},
          {hours: 13, minutes: 0},
          {hours: 14, minutes: 0},
          {hours: 15, minutes: 0},
          {hours: 16, minutes: 0},
          {hours: 17, minutes: 0},
          {hours: 18, minutes: 0},
          {hours: 19, minutes: 0},
          {hours: 20, minutes: 0},
        ] as Time[],
        existingReservations: this.allReservation,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      let reservation: Reservation = data?.reservation;
      if (!reservation) return;
      reservation.id = this.allReservation.length + 1;
      this.allReservation.push(reservation);
      this.save();
      this.filter();
    });
  }

  refreshList(): void {
    const reservationsStr = localStorage.getItem('reservations') ?? '[]';
    this.allReservation = JSON.parse(reservationsStr);
    this.allReservation = this.allReservation.map((reservation: any) => {
      reservation.date = new Date(reservation.date);
      return reservation;
    });
    this.filteredReservations = this.allReservation;
  }

  filter(): void {
    this.filteredReservations = this.allReservation;
    const {
      patient,
      doctor,
      dateFrom: date_from,
      dateTo: date_to,
    } = this.tableFilters;
    if (patient) {
      this.filteredReservations = this.filteredReservations.filter(
        (record) =>
          record.patient.name.includes(patient) ||
          record.patient.lastName.includes(patient)
      );
    }
    if (doctor) {
      this.filteredReservations = this.filteredReservations.filter(
        (record) =>
          record.doctor.name.includes(doctor) ||
          record.doctor.lastName.includes(doctor)
      );
    }
    if (date_from) {
      this.filteredReservations = this.filteredReservations.filter(
        (record) => new Date(record.date) >= new Date(date_from)
      );
    }
    if (date_to) {
      this.filteredReservations = this.filteredReservations.filter(
        (record) => new Date(record.date) <= new Date(date_to)
      );
    }
    this.filteredReservations = this.filteredReservations.filter(reservation => reservation.id > 0);
  }
  clearFilters() {
    this.tableFilters = {};
    this.filter();
  }

  save(): void {
    localStorage.setItem('reservations', JSON.stringify(this.allReservation));
  }

	delete(reservation: Reservation): void {
		this.allReservation[reservation.id - 1].id = -1;
		this.save();
		this.filter();
	}

  openCreateDialogMedicalRecord(reservation: Reservation): void {
    const dialogRef = this.dialog.open(CreateRecordComponent, {
      width: '380px',
      data: {
        availableDoctors: JSON.parse(localStorage.getItem('persons') ?? '[]').filter((person: any) => person.flag_is_doctor),
        patients: JSON.parse(localStorage.getItem('persons') ?? '[]').filter((person: any) => !person.flag_is_doctor),
        existingReservations: JSON.parse(localStorage.getItem('reservations') ?? '[]'),
        allCategories: JSON.parse(localStorage.getItem('categories') ?? '[]'),
        medicalRecord: {} as MedicalRecord,
        reservationOrigin: reservation,
      },
    });
    dialogRef.afterClosed().subscribe((record:MedicalRecord) => {
      if (!record) return;
      const medicalRecordsStr = localStorage.getItem('medicalRecords') ?? '[]';
      let allRecords : MedicalRecord[] = JSON.parse(medicalRecordsStr);
      record.id = allRecords.length + 1;
      allRecords = [...allRecords, record];
      localStorage.setItem('medicalRecords', JSON.stringify(allRecords));
    });
  }
}


