import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';
import { OptionsService } from 'src/services/options.service';

@Component({
    selector: 'app-representations',
    templateUrl: './representations.component.html'
})
export class RepresentationsComponent implements OnInit {

    constructor( public graphService: GraphService, public options: OptionsService ) { }

    ngOnInit(): void {
    }

}
