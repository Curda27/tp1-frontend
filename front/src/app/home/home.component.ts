import { Component } from '@angular/core';
import { Category, Person } from '../models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	loadData(): void {
		let persons: Person[] = [];
		let categories: Category[] = [];
		let person1 = new Person(1, 'John', 'Doe', '595123456789', 'asdf@example.com', '123456', false);
		let person2 = new Person(2, 'Mary', 'Doe', '595321456789', 'qwer@example.com', '123457', true);
		let category1 = new Category(1, 'Category 1');
		let category2 = new Category(1, 'Category 2');
		persons.push(person1);
		persons.push(person2);
		categories.push(category1);
		categories.push(category2);
		localStorage.setItem('persons', JSON.stringify(persons));
		localStorage.setItem('categories', JSON.stringify(categories));
		alert("Datos Iniciales Cargados Correctamente");
	}

	eraseData(): void {
		localStorage.clear();
		alert("Datos Borrados Correctamente");
	}
}
