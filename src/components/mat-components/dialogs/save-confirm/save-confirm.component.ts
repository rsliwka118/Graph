import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-save-confirm',
  templateUrl: './save-confirm.component.html',
  styleUrls: ['./save-confirm.component.scss']
})
export class SaveConfirmComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<SaveConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,  public dataService: DataService) { }

  saveButton(): void{
    this.dataService.saveAndCreateNew(this.data.container, true)
    this.dialogRef.close()
  }

  noSaveButton(): void{
    this.dataService.createNewGraph(this.data.container)
    this.dialogRef.close()
  }

  ngOnInit(): void {
  }

}