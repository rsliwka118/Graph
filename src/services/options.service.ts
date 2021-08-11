import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

    network: any;
    enablePhysics = false
	enableSmooth = false
	enableMatrix = false
	enableEdgeLabel = false
	enableNodeLabel = false
	enableGrid = true

    constructor() { }

	changePhysics() {

		this.network.setOptions({
			physics: {
				enabled: this.enablePhysics,
			}
		});
	}

	changeSmooth() {
		this.network.setOptions({
			edges: {   
				smooth: this.enableSmooth
			}
		});
	}

	changeEdgeLabel(){
		this.network.setOptions({
			edges: {
				font: {
					size: !this.enableEdgeLabel ? 20 : 0
				}
			}
		});
	}

	changeNodeLabel(){
		this.network.setOptions({
			nodes: {
				font: {
					color:  !this.enableNodeLabel ? "#ffffff" : "transparent"
				}
			}
		});
	}

	resetGraph(){
        this.network.body.data.nodes.get().forEach(node => {
        
            this.network.body.data.nodes.update({id: node.id, color: { background: "#6a87af", border: "#48648b" }, font: { size: 30 }});

        });
    }

    loadOptions() {
      this.changeNodeLabel();
      this.changeEdgeLabel();
      this.changePhysics();
      this.changeSmooth();
  }

}
