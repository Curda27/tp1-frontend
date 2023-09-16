import { Component, OnInit } from '@angular/core';
import { Category, Reservation, ReservationFilters } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from '../dialogs/create-reservation.component';

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
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      //TODO: arreglar dimension
      width: '280px',
      data: {} as Reservation,
    });
    dialogRef.afterClosed().subscribe((reservation) => {
      if (!reservation) return;
      reservation.id = this.allReservation.length + 1;
      this.allReservation.push(reservation);
      this.filteredReservations.push(reservation);
      this.save();
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
