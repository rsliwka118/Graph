import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/modules/core/services/data.service';
import { InputService } from 'src/modules/core/services/input.service';

@Component({
    selector: 'app-save-dialog',
    template: `
      	<div style="width: 400px; padding-bottom: 10px;" class="custom-dialog">
      		<div class="edit-text">Zmień nazwę</div>
      		<mat-form-field style="width: 400px;" color="accent" appearance="fill">
        		<mat-label>Nazwa</mat-label>
        		<input style="padding: 0px;" matInput #input [(ngModel)]="title" (focus)="inputService.isTyping = true" (focusout)="inputService.isTyping = false">
      		</mat-form-field>
      		<div style="margin: 0px; padding: 0px" mat-dialog-actions align="end">
          		<button (click)="saveButton()" mat-raised-button color="accent" style="border-color: #ff4081 !important;">Zapisz</button>
      		</div>
    	</div>
    `
})
export class EditDialogComponent implements OnInit {

  title = this.data.title

  constructor(public dialogRef:MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService, public inputService: InputService) { }

  saveButton(): void{
      this.dataService.editGraph(this.title, this.data.id);
      this.dataService.getGraphList();
      this.dialogRef.close();
  }

  
  ngOnInit(): void {
  }

}
