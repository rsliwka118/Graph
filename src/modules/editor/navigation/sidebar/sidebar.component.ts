import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/modules/core/services/data.service';
import { GraphService } from 'src/modules/core/services/graph.service';
import { NavigationService } from 'src/modules/core/services/navigation.service';
import { FilesBottomSheetComponent } from '../files-bottom-sheet/files-bottom-sheet.component';
import { SaveConfirmComponent } from '../dialogs/save-confirm.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { OptionsService } from 'src/modules/core/services/options.service';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';
import { InputService } from 'src/modules/core/services/input.service';
import { SaveDialogComponent } from '../dialogs/save-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/modules/core/services/language.service';

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
        public algorithmsService: AlgorithmsService,
        public inputService: InputService,
        public translate: TranslateService,
        public language: LanguageService) { }
    
    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if(!this.inputService.isTyping) {
            if (event.key === "p") {
                event.preventDefault();
                this.openFilesMenu();
            }

            if (event.key === "w") {
                this.graphService.addNode();
            }

            if (event.key === "n") {
                this.newGraph();
            }

            if(event.ctrlKey && event.key === "s") {
                event.preventDefault();
                this.saveGraph();
            }

            if (event.key === "e") {
                this.graphService.addEdge();
            }

            if(event.key === "r") {
                this.graphService.editEdge();
            }

            if(event.shiftKey) {
                event.preventDefault();
                this.matrixToggle() ? this.sidebarToggle() : this.matrixToggle();
            }

            if(event.altKey) {
                event.preventDefault();
                this.algToggle() ? this.sidebarToggle() : this.algToggle();
            }

            if (event.key === "Delete") {
                this.graphService.deleteSelected();
            }

            if (event.key === "Escape") {
                event.preventDefault();
                this.graphService.disableEditMode();
            }
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

    newGraph() {
        this.dialog.open(SaveConfirmComponent, {data: { container: this.el, isCreateNew: true }});
    }

    saveGraph(){
        let isNew = this.dataService.currentTitle === '',
            isExample = this.dataService.currentId.includes('example');
        
        if(isNew || isExample) this.dialog.open(SaveDialogComponent, {data: {container: this.el, isNew: isNew}});
        else this.dataService.saveGraph();
    }

    openFilesMenu() {
        this.dataService.getGraphList();
        this.bottomSheet.open(FilesBottomSheetComponent, {data: { container: this.el }, panelClass: 'custom-bottom-sheet'});
    }

    changeLanguage(language: string) {
        this.language.useLanguage(language);
    }

    ngOnInit(): void { }

}
