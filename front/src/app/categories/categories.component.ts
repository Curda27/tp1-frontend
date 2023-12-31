import { Component } from '@angular/core';
import {Category, MedicalRecord, Person, Reservation} from '../models';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from '../dialogs/create-category.component';
import { SnackbarService } from '../snackbarservice';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html'
})
export class CategoriesComponent {
	allCategories: Category[] = [];
	availableCategories: Category[] = [];
	dialogCategory!: Category;

	constructor(public dialog: MatDialog, private snackBar: SnackbarService) { }

	ngOnInit(): void {
		this.refreshList();
	}

	openCreateDialog(): void {
		this.dialogCategory = new Category(0, '');
		const dialogRef = this.dialog.open(CreateCategoryComponent, {
			width: '380px',
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
			width: '380px',
			data: { ...category }
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				let id = result.id - 1;
				this.dialogCategory = result;
				this.allCategories[id] = this.dialogCategory;
				this.save();
        this.updateModels(result);
				this.refreshList();
			}
		});
	}

	delete(category: Category): void {
		let id = category.id;
		let records = JSON.parse(localStorage.getItem('medicalRecords') || '[]') as MedicalRecord[];
		if (records.find(record => record.category.id === id)) {
			this.snackBar.open('No puedes borrar una categoria en uso!');
			return;
		}
		this.allCategories[id - 1].id = -1;
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

  updateModels(category: Category){
    const medicalRecords = JSON.parse(
      localStorage.getItem('medicalRecords') || '[]'
    ) as MedicalRecord[];

    medicalRecords.forEach((record) => {
      if (record.category.id === category.id) {
        record.category = category;
      }
    });

    localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));
  }
}
