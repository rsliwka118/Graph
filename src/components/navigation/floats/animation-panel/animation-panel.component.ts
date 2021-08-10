import { Component, OnInit } from '@angular/core';
import { AnimationService } from 'src/services/animation.service';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-animation-panel',
    templateUrl: './animation-panel.component.html',
    styleUrls: ['./animation-panel.component.scss']
})
export class AnimationPanelComponent implements OnInit {

    constructor( public graphService: GraphService, public animationService: AnimationService ) { }

    ngOnInit(): void {
    }

}
