import { Component, OnInit } from '@angular/core';
import { AlgorithmsService } from 'src/services/algorithms.service';
import { GraphService } from 'src/services/graph.service';
import { OptionsService } from 'src/services/options.service';

@Component({
    selector: 'app-representations',
    templateUrl: './representations.component.html'
})
export class RepresentationsComponent implements OnInit {

    constructor(public options: OptionsService) { }

    ngOnInit(): void {
    }

}
