import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-files-bottom-sheet',
  templateUrl: './files-bottom-sheet.component.html',
  styleUrls: ['./files-bottom-sheet.component.scss']
})
export class FilesBottomSheetComponent implements OnInit {

  constructor(public dataService: DataService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dataService.isDeleteProject = false;
  }
}
