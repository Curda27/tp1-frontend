import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SnackbarService } from '../snackbarservice';

@Component({
	selector: 'app-create-category',
	templateUrl: './create-category.component.html',
	standalone: true,
	imports: [MatDialogModule, MatFormFieldModule, MatInputModule,
		FormsModule, MatButtonModule, MatSelectModule],
})
export class CreateCategoryComponent {
	constructor(
		public dialogRef: MatDialogRef<CreateCategoryComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Category,
		private snackBar: SnackbarService
	) { }

	cancel(): void {
		this.dialogRef.close();
	}

	accept(): void {
		if (Object.values(this.data).some(value => value === '')) {
			this.snackBar.open('Por favor, rellene todos los campos');
			return;
		}
		this.dialogRef.close(this.data);
	}
}
