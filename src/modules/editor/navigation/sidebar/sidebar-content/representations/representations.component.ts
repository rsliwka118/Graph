import { Component, OnInit } from '@angular/core';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';
import { OptionsService } from 'src/modules/core/services/options.service';

@Component({
    selector: 'app-representations',
    templateUrl: './representations.component.html'
})
export class RepresentationsComponent implements OnInit {

    constructor(public options: OptionsService, public algorithmsService: AlgorithmsService) { }

    ngOnInit(): void {
    }

}
