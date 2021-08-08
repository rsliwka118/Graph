import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,  public dataService: DataService) { }

  saveButton(): void{
    this.dataService.deleteGraph(this.data.container, this.data.title)
    this.dialogRef.close()
  }

  noSaveButton(): void{
    this.dialogRef.close()
  }

  ngOnInit(): void {
  }
}
