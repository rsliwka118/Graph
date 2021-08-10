import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/components/mat-components/snack-bar/snack-bar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(text) {
        this.snackBar.openFromComponent(SnackBarComponent, {data: {text: text}, duration: 5000, horizontalPosition: "right", verticalPosition: "top", panelClass: ['snackbar-background']});
    }
  
}
