import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OptionsService } from 'src/modules/core/services/options.service';

@Component({
    selector: 'app-delete-confirm',
    template: `
        <div style="width: 400px; padding-bottom: 10px;" class="custom-dialog">
            <div class="edit-text">Generowanie reprezentacji dla dużych grafów może znacząco spowolnić aplikację.<br><br><strong>Wyłączyć generowanie reprezentacji?</strong></div>
            <div style="margin: 0px; padding: 0px" mat-dialog-actions align="end">
                <button (click)="discardButton()" mat-stroked-button color="accent">Nie</button>
                <button (click)="confirmButton()" mat-raised-button color="accent" style="border-color: #ff4081 !important;">Tak</button>
            </div>
        </div>
    `
})
export class RepresentationAlertComponent implements OnInit {

    constructor(public dialogRef:MatDialogRef<RepresentationAlertComponent>, public optionService: OptionsService) { }

    confirmButton(): void {
        this.optionService.enableMatrix = false;
        this.dialogRef.close();
    }

    discardButton(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void { }
}
