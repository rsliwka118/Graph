import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { OptionsService } from 'src/modules/core/services/options.service';

@Component({
    selector: 'app-delete-confirm',
    template: `
        <div style="width: 400px; padding-bottom: 10px;" class="custom-dialog">
            <div class="edit-text">{{'EDITOR.NAVIGATION.DIALOGS.REPRESENTATION.LABEL1' | translate}}<br><br><strong>{{'EDITOR.NAVIGATION.DIALOGS.REPRESENTATION.LABEL2' | translate}}</strong></div>
            <div style="margin: 0px; padding: 0px" mat-dialog-actions align="end">
                <button (click)="discardButton()" mat-stroked-button color="accent">{{'EDITOR.NAVIGATION.DIALOGS.BUTTONS.NO' | translate}}</button>
                <button (click)="confirmButton()" mat-raised-button color="accent" style="border-color: #ff4081 !important;">{{'EDITOR.NAVIGATION.DIALOGS.BUTTONS.ACCEPT' | translate}}</button>
            </div>
        </div>
    `
})
export class RepresentationAlertComponent implements OnInit {

    constructor(public dialogRef:MatDialogRef<RepresentationAlertComponent>, public optionService: OptionsService, public translate: TranslateService) { }

    confirmButton(): void {
        this.optionService.enableMatrix = false;
        this.dialogRef.close();
    }

    discardButton(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void { }
}
