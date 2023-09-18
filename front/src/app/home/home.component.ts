import { Component } from '@angular/core';
import { Category, MedicalRecord, Person, Reservation } from '../models';
import { Time } from "@angular/common";
import { SnackbarService } from '../snackbarservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private snackBar: SnackbarService) { }

  loadData(): void {
    let persons: Person[] = [];
    let categories: Category[] = [];
    let person1 = new Person(1, 'John', 'Doe', '595123456789', 'asdf@example.com', '123456', false);
    let person2 = new Person(2, 'Mary', 'Doe', '595321456789', 'qwer@example.com', '123457', true);
    let person3 = new Person(3, 'Fernando', 'Smith', '595321456789', 'fer@example.com', '123456', false);
    let person4 = new Person(4, 'Doctor', 'Gonzalez', '595321456789', 'doctor@example.com', '123456', true);
    let category1 = new Category(1, 'Category 1');
    let category2 = new Category(2, 'Category 2');
    persons.push(person1);
    persons.push(person2);
    persons.push(person3);
    persons.push(person4);
    categories.push(category1);
    categories.push(category2);
    const records: MedicalRecord[] = [
      {
        category: category1,
        patient: person1,
        doctor: person2,
        date: new Date(),
        diagnostic: 'diagnostic',
        reason: 'reason',
        id: 1,
      },
      {
        category: category2,
        patient: person3,
        doctor: person4,
        date: new Date("2023-09-01 00:00:00"),
        diagnostic: 'diagnostic 123',
        reason: 'reason 123',
        id: 2,
      },
    ];
    const reservations: Reservation[] = [
      {
        patient: person1,
        doctor: person2,
        date: new Date("2023-09-01 00:00:00"),
        time: { hours: 10, minutes: 0 } as Time,
        id: 1,
      },
      {
        patient: person1,
        doctor: person2,
        date: new Date("2023-09-01 00:00:00"),
        time: { hours: 11, minutes: 0 } as Time,
        id: 2,
      },
      {
        patient: person3,
        doctor: person4,
        date: new Date("2023-09-02 00:00:00"),
        time: { hours: 10, minutes: 0 },
        id: 3,
      },
    ];
    localStorage.setItem('persons', JSON.stringify(persons));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('medicalRecords', JSON.stringify(records));
    localStorage.setItem('reservations', JSON.stringify(reservations))
    this.snackBar.open("Datos Iniciales Cargados Correctamente");
  }

  eraseData(): void {
    localStorage.clear();
    this.snackBar.open("Datos Borrados Correctamente");
  }
}
