import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';
import { GraphService } from 'src/modules/core/services/graph.service';

@Component({
    selector: 'app-incidence-matrix',
    template: `
        <div class="matrix-container">
            <div class="matrix">
                <tr *ngFor="let node of nodes; let i = index; trackBy: trackByItem">
                    <mat-checkbox *ngIf="i === 0" style="opacity: 0%;" [disabled]="true"></mat-checkbox>
                    <div style="width: 30px; text-align: left; margin-right: 1px; color: #747679;">{{algorithmsService.nodes[i].label}}</div>
                    <td *ngFor="let edge of edges; let j = index; trackBy: trackById">
                        <div *ngIf="i === 0"><a style="text-align: start; height: 40px; letter-spacing: -3px; text-orientation: upright !important; writing-mode: tb-rl; color: #8c8f92;">{{j+1}}</a></div>
                        <mat-checkbox [disabled]="true" [checked]="algorithmsService.incConnections[i][j].isConnected" style="margin-right: 2px; margin-left: 2px;"></mat-checkbox>
                    </td>
                </tr>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncidenceMatrixComponent implements OnInit {

    @Input() nodes: any;
    @Input() edges: any;

    constructor(public graphService: GraphService, public algorithmsService: AlgorithmsService) { }

    ngOnInit(): void { }

    trackById(index: number, item: any) {
        return item.id;
    }

    trackByItem(index: number, item: any):any {
        return item;
    }
}
