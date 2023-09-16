import { Component, OnInit } from '@angular/core';
import { Category, Reservation, ReservationFilters } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from '../dialogs/create-reservation.component';
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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshList();
  }

  openCreateDialog(): void {
    console.log(JSON.parse(localStorage.getItem('persons') ?? '[]').filter((person: any) => !person.flag_is_doctor))
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      //TODO: arreglar dimension
      width: '280px',
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
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      let reservation: Reservation = data?.reservation;
      if (!reservation) return;
      console.log(reservation);
      reservation.id = this.allReservation.length + 1;
      this.allReservation.push(reservation);
      this.save();
      this.filter();
    });
  }

  refreshList(): void {
    const reservationsStr = localStorage.getItem('reservations') ?? '[]';
    this.allReservation = JSON.parse(reservationsStr);
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
  }
  clearFilters() {
    this.tableFilters = {};
    this.filter();
  }

  save(): void {
    localStorage.setItem('reservations', JSON.stringify(this.allReservation));
  }
}
