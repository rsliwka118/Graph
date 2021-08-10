import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-algorithms',
    templateUrl: './algorithms.component.html'
})
export class AlgorithmsComponent implements OnInit {

    constructor( public graphService: GraphService ) { }

    ngOnInit(): void {
    }

}
