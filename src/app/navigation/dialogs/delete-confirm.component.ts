import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-delete-confirm',
    template: `
        <div style="width: 400px; padding-bottom: 10px;" class="custom-dialog">
            <div class="edit-text">Usunąć projekt?</div>
            <div style="margin: 0px; padding: 0px" mat-dialog-actions align="end">
                <button (click)="noSaveButton()" mat-stroked-button color="accent">Anuluj</button>
                <button (click)="saveButton()" mat-raised-button color="accent" style="border-color: #ff4081 !important;">Usuń</button>
            </div>
        </div>
    `
})
export class DeleteConfirmComponent implements OnInit {

    constructor(public dialogRef:MatDialogRef<DeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,  public dataService: DataService) { }

    saveButton(): void{
        this.dataService.deleteGraph(this.data.container, this.data.title);
        this.dialogRef.close();
    }

    noSaveButton(): void{
        this.dialogRef.close();
    }

    ngOnInit(): void { }
}
