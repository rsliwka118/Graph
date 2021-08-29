import { Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DataService } from 'src/modules/core/services/data.service';

@Component({
    selector: 'app-files-bottom-sheet',
    templateUrl: './files-bottom-sheet.component.html' 
    
})

export class FilesBottomSheetComponent implements OnDestroy {

    constructor(public dataService: DataService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

    ngOnDestroy(): void {
        this.dataService.isDeleteProject = false;
    }
}
