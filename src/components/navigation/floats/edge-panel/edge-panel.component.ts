import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-edge-panel',
    templateUrl: './edge-panel.component.html',
    styleUrls: ['./edge-panel.component.scss']
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
