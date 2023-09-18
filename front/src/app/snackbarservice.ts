import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {
	constructor(private _snackBar: MatSnackBar) { }

	open(message: string) {
		return this._snackBar.open(message, "Cerrar", { duration: 1500 });
	}
}
