import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/services/data.service';

@Component({
    selector: 'app-save-dialog',
    templateUrl: './save-dialog.component.html',
    styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent implements OnInit {

  title = ""

  constructor(public dialogRef:MatDialogRef<SaveDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  saveButton(): void{
      this.dataService.currentTitle = this.title;

      this.dataService.saveAndCreateNew(this.data.container, false);
      this.dataService.getGraphList();
      this.dialogRef.close();
  }

  
  ngOnInit(): void {
  }

}
