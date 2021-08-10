import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/services/data.service';

@Component({
    selector: 'app-save-confirm',
    template: `
        <div style="width: 400px; padding-bottom: 10px;" class="custom-dialog">
            <div class="edit-text">Czy chcesz zapisać zmiany?</div>
            <div style="margin: 0px; padding: 0px" mat-dialog-actions align="end">
                <button (click)="noSaveButton()" mat-stroked-button color="accent">Nie zapisuj</button>
                <button (click)="saveButton()" mat-raised-button color="accent" style="border-color: #ff4081 !important;">Zapisz</button>
            </div>
        </div>
    `
})
export class SaveConfirmComponent implements OnInit {

    constructor(public dialogRef:MatDialogRef<SaveConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,  public dataService: DataService) { }

    saveButton(): void{
        this.dataService.saveAndCreateNew(this.data.container, true);
        this.dialogRef.close();
    }

    noSaveButton(): void{
        this.dataService.createNewGraph(this.data.container);
        this.dialogRef.close();
    }

    ngOnInit(): void {
    }

}