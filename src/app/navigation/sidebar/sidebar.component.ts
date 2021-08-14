import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/core/services/data.service';
import { GraphService } from 'src/app/core/services/graph.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { FilesBottomSheetComponent } from '../files-bottom-sheet.component';
import { SaveConfirmComponent } from '../dialogs/save-confirm.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OptionsService } from 'src/app/core/services/options.service';
import { AlgorithmsService } from 'src/app/core/services/algorithms.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

    @Input() el: ElementRef;

    constructor(
        public graphService: GraphService,
        public navigationService: NavigationService,
        public dataService: DataService,
        public dialog: MatDialog,
        public bottomSheet: MatBottomSheet,
        public options: OptionsService,
        public algorithmsService: AlgorithmsService) { }
    
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

    ngOnInit(): void { }

}
