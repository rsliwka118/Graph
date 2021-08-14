import { Component, OnInit } from '@angular/core';
import { AlgorithmsService } from 'src/app/core/services/algorithms.service';
import { AnimationService } from 'src/app/core/services/animation.service';
import { ColorService } from 'src/app/core/services/color.service';
import { GraphService } from 'src/app/core/services/graph.service';

@Component({
    selector: 'app-algorithms',
    templateUrl: './algorithms.component.html'
})
export class AlgorithmsComponent implements OnInit {

    constructor( public graphService: GraphService, public algorithmsService: AlgorithmsService, public animationService: AnimationService, public colorService: ColorService ) { }

    ngOnInit(): void {
    }

}