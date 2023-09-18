import { Component, OnInit } from '@angular/core';
import { MedicalRecord, Person, PersonFilter, Reservation } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreatePersonComponent } from '../dialogs/create-person.component';

@Component({
	selector: 'app-persons',
	templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit {
	allPersons: Person[] = [];
	filteredPersons: Person[] = [];
	dialogPerson!: Person;
	personFilters: PersonFilter = { flag_is_doctor: "everyone" };

	constructor(public dialog: MatDialog) { }

	ngOnInit(): void {
		this.refreshList();
		this.filter();
	}

	openCreateDialog(): void {
		this.dialogPerson = new Person(0, '', '', '', '', '', false)
		const dialogRef = this.dialog.open(CreatePersonComponent, {
			width: '380px',
			data: { ...this.dialogPerson }
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.dialogPerson = result;
				this.refreshList();
				this.dialogPerson.id = this.allPersons.length + 1;
				this.allPersons.push(this.dialogPerson);
				this.filteredPersons.push(this.dialogPerson);
				this.save();
			}
		});
	}

	openEditDialog(person: Person): void {
		const dialogRef = this.dialog.open(CreatePersonComponent, {
			width: '380px',
			data: { ...person }
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				let id = result.id - 1;
				this.dialogPerson = result;
				this.allPersons[id] = this.dialogPerson;
				this.save();
				this.filter();
			}
		});
	}

	delete(person: Person): void {
		let id = person.id;
		let records = JSON.parse(localStorage.getItem('medicalRecords') || '[]') as MedicalRecord[];
		if (records.find(record => record.doctor.id === id)
			|| records.find(record => record.patient.id === id)) {
			alert('No puedes borrar una persona en uso!');
			return;
		}
		let reservations = JSON.parse(localStorage.getItem('reservations') || '[]') as Reservation[];
		if (reservations.find(reservation => reservation.doctor.id === id)
			|| reservations.find(reservation => reservation.patient.id === id)) {
			alert('No puedes borrar una persona en uso!');
			return;
		}
		this.allPersons[id - 1].id = -1;
		this.save();
		this.filter();
	}

	refreshList(): void {
		let personsString = localStorage.getItem('persons');
		if (personsString) {
			this.allPersons = JSON.parse(personsString);
		}
	}

	filter(): void {
		this.filteredPersons = this.allPersons;
		if (this.personFilters.name) {
			let a = this.personFilters.name.toLowerCase();
			this.filteredPersons = this.filteredPersons.filter(person => person.name.toLowerCase().includes(a));
		}
		if (this.personFilters.lastName) {
			let a = this.personFilters.lastName.toLowerCase();
			this.filteredPersons = this.filteredPersons.filter(person => person.lastName.toLowerCase().includes(a));
		}
		if (this.personFilters.flag_is_doctor === "doctors") {
			this.filteredPersons = this.filteredPersons.filter(person => person.flag_is_doctor);
		}
		else if (this.personFilters.flag_is_doctor === "patients") {
			this.filteredPersons = this.filteredPersons.filter(person => !person.flag_is_doctor);
		}
		this.filteredPersons = this.filteredPersons.filter(person => person.id > 0);
	}

	clearFilters(): void {
		this.personFilters = { flag_is_doctor: "everyone" };
		this.filter();
	}

	save(): void {
		localStorage.setItem('persons', JSON.stringify(this.allPersons));
	}
}
