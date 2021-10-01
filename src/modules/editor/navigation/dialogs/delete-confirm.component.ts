import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/modules/core/services/data.service';

@Component({
    selector: 'app-delete-confirm',
    template: `
        <div style="width: 400px; padding-bottom: 10px;" class="custom-dialog">
            <div class="edit-text">{{'EDITOR.NAVIGATION.DIALOGS.DELETE' | translate}}</div>
            <div style="margin: 0px; padding: 0px" mat-dialog-actions align="end">
                <button (click)="noSaveButton()" mat-stroked-button color="accent">{{'EDITOR.NAVIGATION.DIALOGS.BUTTONS.CANCEL' | translate}}</button>
                <button (click)="saveButton()" mat-raised-button color="accent" style="border-color: #ff4081 !important;">{{'EDITOR.NAVIGATION.DIALOGS.BUTTONS.DELETE' | translate}}</button>
            </div>
        </div>
    `
})
export class DeleteConfirmComponent implements OnInit {

    constructor(public dialogRef:MatDialogRef<DeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,  public dataService: DataService, public translate: TranslateService) { }

    saveButton(): void{
        this.dataService.deleteGraph(this.data.container, this.data.title, this.data.id);
        this.dialogRef.close();
    }

    noSaveButton(): void{
        this.dialogRef.close();
    }

    ngOnInit(): void { }
}
