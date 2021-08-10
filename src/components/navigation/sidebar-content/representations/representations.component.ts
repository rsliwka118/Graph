import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-representations',
    templateUrl: './representations.component.html',
    styleUrls: ['./representations.component.scss']
})
export class RepresentationsComponent implements OnInit {

    constructor( public graphService: GraphService ) { }

    ngOnInit(): void {
    }

}
