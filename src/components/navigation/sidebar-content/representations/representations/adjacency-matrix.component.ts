import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-adjacency-matrix',
    template: `
        <div class="matrix-container">
            <div class="matrix">
            <tr *ngFor="let nodex of graphService.loadedNodes; let i = index">
                    <mat-checkbox *ngIf="i === 0" style="opacity: 0%;" [disabled]="true"></mat-checkbox>
                    <div style="width: 30px; text-align: left; margin-right: 1px; color: #8c8f92;">{{graphService.loadedNodes[i].label}}</div>
                    <td *ngFor="let nodey of graphService.loadedNodes; let j = index">
                        <div *ngIf="i === 0"><a style="text-align: start; height: 40px; letter-spacing: -3px; text-orientation: upright !important; writing-mode: tb-rl; color: #8c8f92;">{{graphService.loadedNodes[j].label}}</a></div>
                        <mat-checkbox [checked]="graphService.adjConnections[i][j]" (change)="graphService.clickAdjMatrix(i,j)" style="margin-right: 2px; margin-left: 2px;"></mat-checkbox>
                    </td>
            </div>
        </div>
    `
})
export class AdjacencyMatrixComponent implements OnInit {

    constructor(public graphService: GraphService) { }

    ngOnInit(): void {
    }

}
