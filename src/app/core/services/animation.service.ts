import { Injectable } from '@angular/core';
import { AlgorithmsService } from './algorithms.service';
import { GraphService } from './graph.service';
import { VisService } from './vis.service';

@Injectable({
    providedIn: 'root'
})
export class AnimationService {

    animatePauseIndex = null;
	animatedNodes = [];
	animationSpeed = 1;
	isAnimationPlayed = false;

	constructor( public graphService: GraphService, public visService: VisService, public algorithmsService: AlgorithmsService ) { }

	editAnimationSpeed(event: any) {
	    this.animationSpeed = event.target.value;
	}

	animateSearch(animatedNodes) {

	    this.animatedNodes = animatedNodes;
	    this.graphService.inAnimateMode = true;

	    this.visService.networkInstance.setOptions({
	        interaction: {
	            dragNodes: false
	        }
	    });

	}

	animationStart() {
	    this.isAnimationPlayed = true;
	    this.graphService.resetGraph();

	    this.animatedNodes.forEach( (node, index) => {

	        setTimeout(() => 
	        { 
	            if(this.isAnimationPlayed) {
	                this.visService.networkInstance.body.data.nodes.update({id: this.algorithmsService.nodes[node].id, color: { background: "#ffa4c3", border: "#ff4081" }});
	            }
	            if( index === this.algorithmsService.nodes.length-1) this.isAnimationPlayed = false;
	        }, this.animationSpeed * 1000 * index); 
				
	    });
		
	}

	exitAnimate() {
	    console.log(this.algorithmsService.startNodeID);
	    this.graphService.inAnimateMode = false;
	    this.isAnimationPlayed = false;
	    this.animatedNodes = [];

	    this.visService.networkInstance.setOptions({
	        interaction: {
	            dragNodes: true
	        }
	    });

	    this.visService.networkInstance.body.data.nodes.update({id: this.algorithmsService.startNodeID, color: { border: '#ff4081', background: '#ffa4c3' }});
	    this.graphService.resetGraph();
	}

}
