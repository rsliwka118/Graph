import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';
import { VisService } from './vis.service';
import { Options } from '../models/options.model';

@Injectable({
    providedIn: 'root'
})
export class OptionsService {

    enablePhysics: boolean
	enableSmooth: boolean
	enableMatrix: boolean
	enableEdgeLabel: boolean
	enableNodeLabel: boolean
	enableGrid: boolean

	constructor(private visService: VisService) {
	    this.enablePhysics = Options.enablePhysics;
	    this.enableSmooth = Options.enableSmooth;
	    this.enableMatrix = Options.enableMatrix;
	    this.enableEdgeLabel = Options.enableEdgeLabel;
	    this.enableNodeLabel = Options.enableNodeLabel;
	    this.enableGrid = Options.enableGrid;
	}

	changePhysics() {

	    this.visService.networkInstance.setOptions({
	        physics: {
	            enabled: this.enablePhysics,
	        }
	    });
	}

	changeSmooth() {
	    this.visService.networkInstance.setOptions({
	        edges: {   
	            smooth: this.enableSmooth
	        }
	    });
	}

	changeEdgeLabel(){
	    this.visService.networkInstance.setOptions({
	        edges: {
	            font: {
	                size: !this.enableEdgeLabel ? 20 : 0
	            }
	        }
	    });
	}

	changeNodeLabel(){
	    this.visService.networkInstance.setOptions({
	        nodes: {
	            font: {
	                color:  !this.enableNodeLabel ? "#ffffff" : "transparent"
	            }
	        }
	    });
	}

	resetGraph(){
	    this.visService.networkInstance.body.data.nodes.get().forEach(node => {
        
	        this.visService.networkInstance.body.data.nodes.update({id: node.id, color: { background: "#6a87af", border: "#48648b" }, font: { size: 30 }});

	    });
	}

	loadOptions() {
	    this.changeNodeLabel();
	    this.changeEdgeLabel();
	    this.changePhysics();
	    this.changeSmooth();
	}

}
