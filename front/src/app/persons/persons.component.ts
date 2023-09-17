import { Component, OnInit } from '@angular/core';
import { Person } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreatePersonComponent } from '../dialogs/create-person.component';

@Component({
	selector: 'app-persons',
	templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit {
	allPersons: Person[] = [];
	availablePersons: Person[] = [];
	dialogPerson!: Person;

	constructor(public dialog: MatDialog) { }

	ngOnInit(): void {
		this.refreshList();
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
				this.availablePersons.push(this.dialogPerson);
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
				this.availablePersons[id] = this.dialogPerson;
				this.save();
				this.refreshList();
			}
		});
	}

	delete(person: Person): void {
		// TODO: no borrar si tiene uso
		let id = person.id - 1;
		this.allPersons[id].id = -1;
		this.save();
		this.refreshList();
	}

	refreshList(): void {
		let personsString = localStorage.getItem('persons');
		if (personsString) {
			this.allPersons = JSON.parse(personsString);
			this.availablePersons = this.allPersons.filter(person => person.id > 0);
		}
	}

	save(): void {
		localStorage.setItem('persons', JSON.stringify(this.allPersons));
	}
}
