import { Component, OnInit } from '@angular/core';
import { AlgorithmsService } from 'src/app/core/services/algorithms.service';
import { GraphService } from 'src/app/core/services/graph.service';

@Component({
    selector: 'app-incidence-matrix',
    template: `
        <div class="matrix-container">
            <div class="matrix">
                <tr *ngFor="let node of algorithmsService.nodes; let i = index; trackBy: trackById">
                    <mat-checkbox *ngIf="i === 0" style="opacity: 0%;" [disabled]="true"></mat-checkbox>
                    <div style="width: 30px; text-align: left; margin-right: 1px; color: #747679;">{{algorithmsService.nodes[i].label}}</div>
                    <td *ngFor="let edge of algorithmsService.edges; let j = index; trackBy: trackById">
                        <div *ngIf="i === 0"><a style="text-align: start; height: 40px; letter-spacing: -3px; text-orientation: upright !important; writing-mode: tb-rl; color: #8c8f92;">{{j+1}}</a></div>
                        <mat-checkbox [disabled]="true" [checked]="algorithmsService.incConnections[i][j]" style="margin-right: 2px; margin-left: 2px;"></mat-checkbox>
                    </td>
                </tr>
            </div>
        </div>
    `
})
export class IncidenceMatrixComponent implements OnInit {

    constructor(public graphService: GraphService, public algorithmsService: AlgorithmsService) { }

    ngOnInit(): void { }

    trackById(index, item) {
        return item.id;
    }
}
