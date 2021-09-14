import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';
import { GraphService } from 'src/modules/core/services/graph.service';

@Component({
    selector: 'app-adjacency-matrix',
    styleUrls: ['representations.scss'],
    template: `
        <div class="matrix-container">
            <div class="matrix">
                <tr *ngFor="let nodex of nodesConnections; let i = index; trackBy:trackByItem">
                    <mat-checkbox *ngIf="i === 0" style="opacity: 0%;" [disabled]="true"></mat-checkbox>
                    <div style="width: 30px; text-align: left; margin-right: 1px; color: #8c8f92;">{{algorithmsService.nodes[i].label}}</div>
                    <td *ngFor="let nodey of nodex; let j = index; trackBy:trackById">
                        <div *ngIf="i === 0"><a style="text-align: start; height: 40px; letter-spacing: -3px; text-orientation: upright !important; writing-mode: tb-rl; color: #8c8f92;">{{algorithmsService.nodes[j].label}}</a></div>
                        <mat-checkbox [checked]="nodey.isConnected" (change)="algorithmsService.clickAdjMatrix(i,j)" style="margin-right: 2px; margin-left: 2px;"></mat-checkbox>
                    </td>
                </tr>    
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdjacencyMatrixComponent implements OnInit {

    @Input() nodesConnections: any;

    constructor(public graphService: GraphService, 
        public algorithmsService: AlgorithmsService
    ) {
    }

    ngOnInit(): void {}

    trackByItem(index: number, node: any): any {
        return index;
    }
    
    trackById(index: number, node: any): any {
        return node.id;
    }
}