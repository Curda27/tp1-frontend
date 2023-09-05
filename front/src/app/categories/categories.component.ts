import { Component } from '@angular/core';
import { Category } from '../models';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html'
})
export class CategoriesComponent {
	categories: Category[] = [];

	ngOnInit(): void {
		let categoriesString = localStorage.getItem('categories');
		if (categoriesString) {
			this.categories = JSON.parse(categoriesString);
		}
	}
}
