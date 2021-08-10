import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-node-panel',
    template: `
        <div class="edit-text">Węzeł</div>
        <mat-form-field color="accent" appearance="fill" style="margin-bottom: 10px">
            <mat-label>Zmień etykietę</mat-label>
            <input matInput #input autocomplete="off" maxlength="3" (keyup)="editNode($event)"
                [(ngModel)]="this.graphService.nodeLabel">
        </mat-form-field>
        <div style="padding-bottom: 10px;">
            <a class="edit-text" style="font-size: 15px">Węzeł startowy</a>
            <mat-slide-toggle style="float:right" [checked]="graphService.getStartNode()"
                (change)="graphService.setStartNode()"></mat-slide-toggle>
        </div>
    `
})
export class NodePanelComponent implements OnInit {

    constructor( public graphService: GraphService ) { }

    editNode(event: any) {
        let label = "";
        label += " " + event.target.value + " ";

        this.graphService.editNodeLabel(label);
    }

    ngOnInit(): void {
    }

}
