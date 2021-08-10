import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-edge-panel',
    template: `
        <div class="edit-text">Krawędź</div>
        <mat-form-field color="accent" appearance="fill" style="margin-bottom: 10px">
            <mat-label>Zmień wagę</mat-label>
            <input matInput autocomplete="off" type="number" (keyup)="editEdge($event)"
                [(ngModel)]="this.graphService.edgeWeight">
        </mat-form-field>
    `
})
export class EdgePanelComponent implements OnInit {

    constructor( public graphService: GraphService ) { }

    editEdge(event: any) {
        let label = event.target.value;

        this.graphService.editEdgeWeight(label);
    }

    ngOnInit(): void {
    }

}
