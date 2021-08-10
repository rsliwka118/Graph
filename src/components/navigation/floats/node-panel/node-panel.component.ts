import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-node-panel',
    templateUrl: './node-panel.component.html',
    styleUrls: ['./node-panel.component.scss']
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
