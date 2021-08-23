import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DataService } from 'src/modules/core/services/data.service';

@Component({
    selector: 'app-files-bottom-sheet',
    template: `
        <div class="list-title">Zapisane grafy</div>

        <div style="position: absolute; right: 0px; top: 0px; margin: 20px;">
        <button (click) = "dataService.switchDeleteProjectMode()"
            #tooltip="matTooltip"
            matTooltip="Usuń wybrane projekty"
            matTooltipClass="custom-tooltip"
            matTooltipPosition="right"
            mat-icon-button>
            <mat-icon *ngIf="!dataService.isDeleteProject" inline="true" svgIcon="delete-icon"></mat-icon>
            <mat-icon *ngIf="dataService.isDeleteProject" inline="true" svgIcon="delete-icon-active"></mat-icon>
        </button>
        </div> 

        <mat-divider style="margin-bottom: 10px; margin-left: 20px; margin-right: 20px; border-color:white; opacity: 20%;"></mat-divider>

        <div mat-icon-button class="item-list">
            <button
            (click)="dataService.graphListEdit(data.container, graph.title)" 
            #tooltip="matTooltip"
            matTooltipClass="custom-tooltip" 
            matTooltip="{{graph.title}}" class="item" mat-button *ngFor="let graph of dataService.graphList">
                <div class="item-preview">
                    <!--<mat-icon style="opacity: 0.5;" svgIcon="graph-icon"></mat-icon>-->
                    <img *ngIf="graph.image" class="preview" src="{{graph.image}}"/>
                    <img *ngIf="!graph.image" style="opacity: 0; width: 200px; height: 130px;"/>
                </div>
                
                <a class="item-title">{{graph.title}}</a>
            </button>
        </div>
    `
})

export class FilesBottomSheetComponent implements OnDestroy {

    constructor(public dataService: DataService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

    ngOnDestroy(): void {
        this.dataService.isDeleteProject = false;
    }
}
