import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/modules/core/services/data.service';
import { SaveDialogComponent } from './save-dialog.component';

@Component({
    selector: 'app-save-confirm',
    template: `
        <div style="width: 400px; padding-bottom: 10px;" class="custom-dialog">
            <div class="edit-text">{{'EDITOR.NAVIGATION.DIALOGS.SAVE_CONFIRM' | translate}}</div>
            <div style="margin: 0px; padding: 0px" mat-dialog-actions align="end">
                <button (click)="noSaveButton()" mat-stroked-button color="accent">{{'EDITOR.NAVIGATION.DIALOGS.BUTTONS.DONT_SAVE' | translate}}</button>
                <button (click)="saveButton()" mat-raised-button color="accent" style="border-color: #ff4081 !important;">{{'EDITOR.NAVIGATION.DIALOGS.BUTTONS.SAVE' | translate}}</button>
            </div>
        </div>
    `
})
export class SaveConfirmComponent implements OnInit {

    constructor(public dialogRef:MatDialogRef<SaveConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,  public dataService: DataService, public dialog: MatDialog,  public translate: TranslateService) { }

    saveButton(): void{
        let isNew = this.dataService.currentTitle === '',
            isExample = this.dataService.currentId.includes('example');
        
        if(isNew || isExample) this.dialog.open(SaveDialogComponent, {data: {container: this.data.container, isExample: isExample, isNew: isNew, isCreateNew: this.data.isCreateNew}});
        else{
            this.dataService.saveGraph();
            this.dataService.createNewGraph(this.data.container);
        }

        this.dialogRef.close();
    }

    noSaveButton(): void{
        this.dataService.createNewGraph(this.data.container);
        this.dialogRef.close();
    }

    ngOnInit(): void {
    }

}