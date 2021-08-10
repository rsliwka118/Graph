import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/services/data.service';
import { GraphService } from 'src/services/graph.service';
import { NavigationService } from 'src/services/navigation.service';
import { FilesBottomSheetComponent } from '../../mat-components/files-bottom-sheet/files-bottom-sheet.component';
import { SaveConfirmComponent } from '../../mat-components/dialogs/save-confirm/save-confirm.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @Input() el: ElementRef;

    constructor(
        public graphService: GraphService,
        public navigationService: NavigationService,
        public dataService: DataService,
        public dialog: MatDialog,
        public bottomSheet: MatBottomSheet) { }
    
    sidebarToggle() {
        this.navigationService.toggle();
    }

    matrixToggle(): boolean {
        return this.navigationService.openRepresentationsPanel();
    }

    algToggle(): boolean {
        return this.navigationService.openAlgorithmsPanel();
    }

    openSaveGraphConfirm() {
        this.dialog.open(SaveConfirmComponent, {data: { container: this.el }});
    }

    openFilesMenu() {
        this.bottomSheet.open(FilesBottomSheetComponent, {data: { container: this.el }, panelClass: 'custom-bottom-sheet'});
        this.dataService.getGraphList();
    }

    ngOnInit(): void {
        
    }

}
