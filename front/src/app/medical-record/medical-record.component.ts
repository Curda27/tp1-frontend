import { Component, OnInit } from '@angular/core';
import { MedicalRecord, MedicalRecordFilters } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecordComponent } from '../dialogs/create-record.component';

@Component({
  selector: 'app-record',
  templateUrl: './medical-record.component.html',
})
export class MedicalRecordComponent implements OnInit {
  allRecords: MedicalRecord[] = [];
  filteredRecords: MedicalRecord[] = [];

  tableFilters: MedicalRecordFilters = {};

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshList();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateRecordComponent, {
      //TODO: arreglar dimension
      width: '280px',
      data: {} as MedicalRecord,
    });
    dialogRef.afterClosed().subscribe((record) => {
      if (!record) return;
      record.id = this.allRecords.length + 1;
      this.allRecords.push(record);
      this.filteredRecords.push(record);
      this.save();
    });
  }

  refreshList(): void {
    const medicalRecordsStr = localStorage.getItem('medicalRecords') ?? '[]';
    this.allRecords = JSON.parse(medicalRecordsStr);
    this.filteredRecords = this.allRecords;
  }

  filter(): void {
    this.filteredRecords = this.allRecords;
    const { patient, doctor, categoryId, date_from, date_to } =
      this.tableFilters;
    if (patient) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) =>
          record.patient.name === patient || record.patient.lastName === patient
      );
    }
    if (doctor) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) =>
          record.doctor.name === doctor || record.doctor.lastName === doctor
      );
    }
    if (categoryId) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) => record.category.id === categoryId
      );
    }
    if (date_from) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) => record.date >= new Date(date_from)
      );
    }
    if (date_to) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) => record.date <= new Date(date_to)
      );
    }
  }

  save(): void {
    localStorage.setItem('medicalRecords', JSON.stringify(this.allRecords));
  }
}
