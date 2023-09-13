import { Component } from '@angular/core';
import { Category } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../dialogs/create-category.component';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html'
})
export class CategoriesComponent {
	allCategories: Category[] = [];
	availableCategories: Category[] = [];
	dialogCategory!: Category;

	constructor(public dialog: MatDialog) { }

	ngOnInit(): void {
		this.refreshList();
	}

	openCreateDialog(): void {
		this.dialogCategory = new Category(0, '');
		const dialogRef = this.dialog.open(CreateCategoryComponent, {
			//TODO: arreglar dimension
			width: '280px',
			data: { ...this.dialogCategory }
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.dialogCategory = result;
				this.refreshList();
				this.dialogCategory.id = this.allCategories.length + 1;
				this.allCategories.push(this.dialogCategory);
				this.availableCategories.push(this.dialogCategory);
				this.save();
			}
		});
	}

	openEditDialog(category: Category): void {
		const dialogRef = this.dialog.open(CreateCategoryComponent, {
			//TODO: arreglar dimension
			width: '280px',
			data: { ...category }
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				let id = result.id - 1;
				this.dialogCategory = result;
				this.allCategories[id] = this.dialogCategory;
				this.save();
				this.refreshList();
			}
		});
	}

	delete(category: Category): void {
		// TODO: no borrar si tiene uso
		let id = category.id - 1;
		this.allCategories[id].id = -1;
		this.save();
		this.refreshList();
	}

	refreshList(): void {
		let categoriesString = localStorage.getItem('categories');
		if (categoriesString) {
			this.allCategories = JSON.parse(categoriesString);
			this.availableCategories = this.allCategories.filter(category => category.id > 0);
		}
	}

	save(): void {
		localStorage.setItem('categories', JSON.stringify(this.allCategories));
	}
}
