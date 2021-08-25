import { Component, OnInit } from '@angular/core';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';
import { GraphService } from 'src/modules/core/services/graph.service';
import { InputService } from 'src/modules/core/services/input.service';

@Component({
    selector: 'app-node-panel',
    template: `
        <div class="edit-text">Węzeł</div>
        <mat-form-field color="accent" appearance="fill" style="margin-bottom: 10px">
            <mat-label>Zmień etykietę</mat-label>
            <input matInput #input autocomplete="off" maxlength="3" (keyup)="editNode($event)"
                [(ngModel)]="this.graphService.nodeLabel" (focus)="inputService.isTyping = true" (focusout)="inputService.isTyping = false">
        </mat-form-field>
        <div style="padding-bottom: 10px;">
            <a class="edit-text" style="font-size: 15px">Węzeł startowy</a>
            <mat-slide-toggle style="float:right" [checked]="graphService.getStartNode()"
                (change)="algorithmsService.setStartNode()"></mat-slide-toggle>
        </div>
    `
})
export class NodePanelComponent implements OnInit {

    constructor( public graphService: GraphService, public algorithmsService: AlgorithmsService, public inputService: InputService) { }

    editNode(event: any) {
        let label = "";
        label += " " + event.target.value + " ";

        this.graphService.editNodeLabel(label);
    }

    ngOnInit(): void {
    }

}
