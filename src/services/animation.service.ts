import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';

@Injectable({
    providedIn: 'root'
})
export class AnimationService {

    constructor( public graphService: GraphService ) { }

    editAnimationSpeed(event: any) {
        this.graphService.animationSpeed = event.target.value;
    }

}
