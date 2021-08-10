import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-adjacency-list',
    template: `
        <div class="matrix-container">
            <div class="matrix">
                <div *ngFor="let nodex of graphService.loadedNodes; let i = index">
                    <span style="text-align: left; margin-right: 1px; color: #ff4081; font-size: 20px;">{{graphService.loadedNodes[i].label}}</span>
                    <span *ngFor="let nodey of graphService.loadedNodes; let j = index" >
                        <td *ngIf="graphService.adjConnections[i][j]">
                            <a style="font-size: 20px; color: #8c8f92;"><span style="opacity: 50%;">&#10142;</span>{{graphService.loadedNodes[j].label}}</a>
                        </td>
                    </span>
                </div>
            </div>
        </div>
    `
})
export class AdjacencyListComponent implements OnInit {

    constructor(public graphService: GraphService) { }

    ngOnInit(): void {
    }

}
