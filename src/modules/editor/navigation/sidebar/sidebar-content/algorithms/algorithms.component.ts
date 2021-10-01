import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';
import { AnimationService } from 'src/modules/core/services/animation.service';
import { ColorService } from 'src/modules/core/services/color.service';
import { GraphService } from 'src/modules/core/services/graph.service';

@Component({
    selector: 'app-algorithms',
    templateUrl: './algorithms.component.html'
})
export class AlgorithmsComponent implements OnInit {

    constructor(
        public graphService: GraphService,
        public algorithmsService: AlgorithmsService,
        public animationService: AnimationService,
        public colorService: ColorService,
        public translate: TranslateService) { }

    ngOnInit(): void {
    }

}
