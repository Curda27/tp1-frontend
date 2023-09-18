import { Component, OnInit } from '@angular/core';
import { Category, MedicalRecord, MedicalRecordFilters } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecordComponent } from '../dialogs/create-record.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-record',
  templateUrl: './medical-record.component.html',
})
export class MedicalRecordComponent implements OnInit {
  allRecords: MedicalRecord[] = [];
  filteredRecords: MedicalRecord[] = [];
  categories: Category[] = [];

  tableFilters: MedicalRecordFilters = {};

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshList();
    this.getCategories();
  }

  getCategories() {
    const categoriesStr = localStorage.getItem('categories') ?? '[]';
    this.categories = JSON.parse(categoriesStr);
  }
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateRecordComponent, {
      width: '380px',
      data: {
        availableDoctors: JSON.parse(localStorage.getItem('persons') ?? '[]').filter((person: any) => person.flag_is_doctor),
        patients: JSON.parse(localStorage.getItem('persons') ?? '[]').filter((person: any) => !person.flag_is_doctor),
        existingReservations: JSON.parse(localStorage.getItem('reservations') ?? '[]'),
        allCategories: JSON.parse(localStorage.getItem('categories') ?? '[]'),
        medicalRecord: {} as MedicalRecord,
      },
    });
    dialogRef.afterClosed().subscribe((record) => {
      if (!record) return;
      record.id = this.allRecords.length + 1;
      this.allRecords = [...this.allRecords, record];
      this.filteredRecords = [...this.filteredRecords, record];
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
    const {
      patient,
      doctor,
      categoryId,
      dateFrom: date_from,
      dateTo: date_to,
    } = this.tableFilters;
    if (patient) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) =>
          record.patient.name.includes(patient) ||
          record.patient.lastName.includes(patient)
      );
    }
    if (doctor) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) =>
          record.doctor.name.includes(doctor) ||
          record.doctor.lastName.includes(doctor)
      );
    }
    if (categoryId) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) => record.category.id === categoryId
      );
    }
    if (date_from) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) => new Date(record.date) >= new Date(date_from)
      );
    }
    if (date_to) {
      this.filteredRecords = this.filteredRecords.filter(
        (record) => new Date(record.date) <= new Date(date_to)
      );
    }
  }
  clearFilters() {
    this.tableFilters = {};
    this.filter();
  }

  save(): void {
    localStorage.setItem('medicalRecords', JSON.stringify(this.allRecords));
  }

  excel(): void {
    let fileName = 'Fichas.xlsx';
    // get table
    let element = document.getElementsByClassName("table")[0];
    // pass table to xlsx
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    // save to file
    XLSX.writeFile(wb, fileName);
  }

  pdf(): void {
    let doc = new jsPDF('p', 'mm', 'a4');
    let element = document.getElementsByClassName("table")[0] as HTMLElement;
    doc.html(element, {
      callback: function (doc: jsPDF) {
        doc.save('Fichas.pdf');
      },
      // random numbers for a4 size
      margin: [4, 4, 4, 4],
      width: 202,
      windowWidth: 900,
    });
  }
}
