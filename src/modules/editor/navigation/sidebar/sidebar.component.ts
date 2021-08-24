import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/modules/core/services/data.service';
import { GraphService } from 'src/modules/core/services/graph.service';
import { NavigationService } from 'src/modules/core/services/navigation.service';
import { FilesBottomSheetComponent } from '../files-bottom-sheet.component';
import { SaveConfirmComponent } from '../dialogs/save-confirm.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OptionsService } from 'src/modules/core/services/options.service';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';

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
    
    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {

        if (event.key === "p") {
            this.openFilesMenu();
        }

        if (event.key === "w") {
            this.graphService.addNode();
        }

        if (event.key === "n") {
            this.openSaveGraphConfirm();
        }

        if(event.key === "s") {
            this.dataService.saveAndCreateNew(this.el, false);
        }

        if (event.key === "e") {
            this.graphService.addEdge();
        }

        if(event.key === "r") {
            this.graphService.editEdge();
        }

        if(event.shiftKey) {
            this.matrixToggle() ? this.sidebarToggle() : this.matrixToggle();
        }

        if(event.ctrlKey) {
            this.algToggle() ? this.sidebarToggle() : this.algToggle();
        }

        if (event.key === "Delete") {
            this.graphService.deleteSelected();
        }
    }

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
