import { Component, Inject, OnDestroy } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/modules/core/services/data.service';
import { DeleteConfirmComponent } from '../dialogs/delete-confirm.component';
import { EditDialogComponent } from '../dialogs/edit-dialog.component';

@Component({
    selector: 'app-files-bottom-sheet',
    templateUrl: './files-bottom-sheet.component.html' 
})

export class FilesBottomSheetComponent implements OnDestroy {

    constructor(
        public dataService: DataService,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        public translate: TranslateService,
        public dialog: MatDialog, 
        public bottomSheet: MatBottomSheet,
        private router: Router) { }


        // graphListEdit(container, title, id) {
        //     if(this.isDeleteProject){
        //         this.dialog.open(DeleteConfirmComponent, {data: {container: container, title: title, id: id}});
        //     }
        //     else if(this.isEditProject){
        //         this.dialog.open(EditDialogComponent, {data: {container: container, title: title, id: id}});
        //     }
        //     else {
        //         this.router.navigate(['/editor/'+ id]);
        //         this.bottomSheet.dismiss();
        //     }
        // }
        
    openProject(id): void{
        this.router.navigate(['/editor/'+ id]);
        this.bottomSheet.dismiss();
    }

    deleteProject(container, title, id): void {
        this.dialog.open(DeleteConfirmComponent, {data: {container: container, title: title, id: id}});
    }

    editProject(container, title, id): void {
        this.dialog.open(EditDialogComponent, {data: {container: container, title: title, id: id}});
    }

    ngOnDestroy(): void {
        this.dataService.isDeleteProject = false;
    }
}
