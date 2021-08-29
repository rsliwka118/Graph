import { Injectable } from '@angular/core';
import { VisService } from './vis.service';
import { GraphService } from './graph.service';
import mix from 'mix-color';

@Injectable({
  	providedIn: 'root'
})
export class ColorService {

	colors: string[];

	constructor(private visService: VisService, private graphService: GraphService) {
	    this.getRandomColors(1000);
	}

	colorNodes(nodes) {

	    this.graphService.resetGraph();
	    this.graphService.inheritEdges(true);
		
	    let tabKS = [];
	    let tab = nodes;

	    tab.forEach( (n, index) => {
			
	        tabKS.push({
	            color: this.colors[index],
	            used: false
	        });

	    });

	    for(let i = 0; i < tab.length ; i++) {
			
	        tabKS.forEach(c => { c.used = false; });
			
	        let neighbors = this.visService.networkInstance.getConnectedNodes(tab[i].id);
			
	        if(neighbors.length > 0) {

	            neighbors.forEach( (n) => {
					
	                let neighbor = tab.find(node => (node.id === n));

	                if(neighbor.color !== '') {

	                    tabKS.forEach(c => { 

	                        if(c.color === neighbor.color) c.used = true; 
					
	                    });
	                }
	            });
	        }

	        tab[i].color =  tabKS.find( c => c.used === false).color;

	    }

	    tab.forEach(node => {
	        this.visService.networkInstance.body.data.nodes.update({id: node.id, color: { background: node.color , border: node.color }});
	    });

	}

	degreeColor() {

	    this.graphService.inheritEdges(true);

	    let maxDegree = 0;

	    this.visService.networkInstance.body.data.nodes.get().forEach( (node) => {
			
	        maxDegree = this.visService.networkInstance.getConnectedEdges(node.id).length > maxDegree ? this.visService.networkInstance.getConnectedEdges(node.id).length : maxDegree;

	    });

	    this.visService.networkInstance.body.data.nodes.get().forEach( (node) => { 

	        let degreePercentage = this.visService.networkInstance.getConnectedEdges(node.id).length / maxDegree;

	        this.visService.networkInstance.body.data.nodes.update({id: node.id, 
	            color: { background: mix('#202124','#ff4080', degreePercentage) , border: mix('#202124','#ff4080', degreePercentage) },
	            font: { size: degreePercentage * 100 }
			
	        });

	    });

	}

	getRandomColors(size) {

	    let colors = [];

	    for(let i = 0; i < size ; i++) {
			
	        colors.push( '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6) );
			
	    }
			
	    this.colors = colors;
	}
}
