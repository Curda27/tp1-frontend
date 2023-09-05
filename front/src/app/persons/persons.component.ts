import { Component, OnInit } from '@angular/core';
import { Person } from '../models';

@Component({
	selector: 'app-persons',
	templateUrl: './persons.component.html',
	styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
	persons: Person[] = [];

	ngOnInit(): void {
		let personsString = localStorage.getItem('persons');
		if (personsString) {
			this.persons = JSON.parse(personsString);
		}
	}
}
