import { Component, OnInit } from '@angular/core';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';
import { GraphService } from 'src/modules/core/services/graph.service';

@Component({
    selector: 'app-adjacency-list',
    template: `
        <div class="matrix-container">
            <div class="matrix">
                <div *ngFor="let nodex of algorithmsService.nodes; let i = index; trackBy:trackByItem">
                    <span style="text-align: left; margin-right: 1px; color: #ff4081; font-size: 20px;">{{algorithmsService.nodes[i].label}}</span>
                    <span *ngFor="let nodey of algorithmsService.nodes; let j = index; trackBy:trackById" >
                        <td *ngIf="algorithmsService.adjConnections[i][j].isConnected">
                            <a style="font-size: 20px; color: #8c8f92;"><span style="opacity: 50%;">&#10142;</span>{{algorithmsService.nodes[j].label}}</a>
                        </td>
                    </span>
                </div>
            </div>
        </div>
    `
})
export class AdjacencyListComponent implements OnInit {

    constructor(public graphService: GraphService, public algorithmsService: AlgorithmsService) { }

    ngOnInit(): void {
    }

    trackById(index: number, item: any) {
        return item.id;
    }

    trackByItem(index: number, item: any):any {
        return item;
    }
}
