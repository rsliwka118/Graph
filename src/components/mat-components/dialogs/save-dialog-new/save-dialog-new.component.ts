import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/services/data.service';
@Component({
    selector: 'app-save-dialog-new',
    templateUrl: './save-dialog-new.component.html',
    styleUrls: ['./save-dialog-new.component.scss']
})
export class SaveDialogNewComponent implements OnInit {

  title = ""

  constructor(public dialogRef:MatDialogRef<SaveDialogNewComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  saveButton(): void{
      this.dataService.currentTitle = this.title;

      this.dataService.saveAndCreateNew(this.data.container, true);
      this.dataService.getGraphList();
      this.dialogRef.close();
  }

  
  ngOnInit(): void {
  }

}
