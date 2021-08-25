import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/modules/core/services/graph.service';
import { InputService } from 'src/modules/core/services/input.service';

@Component({
    selector: 'app-edge-panel',
    template: `
        <div class="edit-text">Krawędź</div>
        <mat-form-field color="accent" appearance="fill" style="margin-bottom: 10px">
            <mat-label>Zmień wagę</mat-label>
            <input matInput autocomplete="off" type="number" (keyup)="editEdge($event)"
                [(ngModel)]="this.graphService.edgeWeight" (focus)="inputService.isTyping = true" (focusout)="inputService.isTyping = false">
        </mat-form-field>
    `
})
export class EdgePanelComponent implements OnInit {

    constructor( public graphService: GraphService, public inputService: InputService ) { }

    editEdge(event: any) {
        let label = event.target.value;

        this.graphService.editEdgeWeight(label);
    }

    ngOnInit(): void {
    }

}
