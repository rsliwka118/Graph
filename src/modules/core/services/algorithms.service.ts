import { Injectable } from '@angular/core';
import { OptionsService } from './options.service';
import { VisService } from './vis.service';
import { Matrix } from '../models/matrix.model';

@Injectable({
  	providedIn: 'root'
})
export class AlgorithmsService {

	nodes: any;
  	edges: any;
	adjConnections: Matrix[][] = [];
	incConnections: Matrix[][] = [];
	dfsResult: number[];
	bfsResult: number[];
	startNodeID = '';
	selectedNodeID = null;
	selectedEdgeID = null;

	constructor(public options: OptionsService, private visService: VisService) { }
	
	clickAdjMatrix(node1Index: number ,node2Index: number) {

	    if(this.adjConnections[node1Index][node2Index].isConnected) {

	        let edge1 = this.edges.find(e => (e.from === this.nodes[node1Index].id && e.to === this.nodes[node2Index].id)) ? this.edges.find(e => (e.from === this.nodes[node1Index].id && e.to === this.nodes[node2Index].id)) : null;
	        let edge2 = this.edges.find(e => (e.to === this.nodes[node1Index].id && e.from === this.nodes[node2Index].id)) ? this.edges.find(e => (e.to === this.nodes[node1Index].id && e.from === this.nodes[node2Index].id)) : null;

	        if(edge1 !== null) this.visService.networkInstance.body.data.edges.remove(edge1.id);
	        if(edge2 !== null) this.visService.networkInstance.body.data.edges.remove(edge2.id);

	    } else {

	        let node1Id = this.nodes[node1Index].id;
	        let node2Id = this.nodes[node2Index].id;
		
	        this.visService.networkInstance.body.data.edges.add([{from: node1Id, to: node2Id, label: "1"}]);
	    }
	}

	// clickIncMatrix(nodeIndex, edgeIndex){

	//     let nodes = this.getNodes();
	//     let edges = this.getEdges();

	//     let nodeId = nodes[nodeIndex].id;
	//     let edgeId = edges[edgeIndex].id;

	//     if(!this.adjConnections[nodeIndex][edgeIndex].isConnected) {

	//         if( edges[edgeIndex].from === "" && edges[edgeIndex].to === "" )
	//             this.visService.networkInstance.body.data.edges.update([{ id: edgeId, from: nodeId, to: nodeId, label: "0"}]);

	//     } else {

	//         if(edges[edgeIndex].from === edges[edgeIndex].to) {

	//             this.visService.networkInstance.body.data.edges.update([{ id: edgeId, from: "", to: "", label: "0"}]);

	//         } else {

	//             if(edges[edgeIndex].from === nodeId) this.visService.networkInstance.body.data.edges.update([{ id: edgeId, from: nodeId, label: "0"}]);

	//             else this.visService.networkInstance.body.data.edges.update([{ id: edgeId, to: nodeId, label: "0"}]);

	//         }
	//     }

	//     this.getMatrix();

	// }

	getMatrix() {
	    if(this.options.enableMatrix) {

	        this.getIncMatrix();
	        this.getAdjMatrix();
	    }
	}

	getGraph() {
	    this.nodes = this.visService.networkInstance.body.data.nodes.get();
	    this.edges = this.visService.networkInstance.body.data.edges.get();
	}

	fillAdjMatrix(){
	    this.adjConnections = [];
		
	    for(let i=0; i < this.nodes.length ; i++) {
	        this.adjConnections[i] = [];
	        for(let j=0; j < this.nodes.length ; j++) {
	            this.adjConnections[i][j] = new Matrix(i+''+j, false);
	        }
	    }
	}

	fillIncMatrix(){
	    this.incConnections = [];
		
	    for(let i=0; i < this.nodes.length ; i++) {
	        this.incConnections[i] = [];
	        for(let j=0; j < this.edges.length ; j++) {
	            this.incConnections[i][j] = new Matrix(i+''+j, false);
	        }
	    }
	}

	getAdjMatrix() {

	    //if(nodes.length) this.adjConnections = new Array(nodes.length).fill(false).map(() => new Array(nodes.length).fill(false));

	    this.fillAdjMatrix();
		
	    for(let i=0; i < this.nodes.length ; i++){

	        for(let j=0; j < this.nodes.length ; j++) {
			
	            if( (this.edges.find(e => (e.from === this.nodes[i].id && e.to === this.nodes[j].id))) || 
					(this.edges.find(e => (e.to === this.nodes[i].id && e.from === this.nodes[j].id)))
	            ) {
	                this.adjConnections[i][j].isConnected = true;
	            }
	        }
	    }

	    return this.adjConnections;

	}

	getIncMatrix(){

	    //if(this.nodes.length && this.edges.length) this.incConnections = new Array(this.nodes.length).fill(false).map(() => new Array(this.edges.length).fill(false));

	    this.fillIncMatrix();

	    for(let i=0; i < this.nodes.length ; i++) {

	        for(let j=0; j < this.edges.length ; j++) {
			
	            if( this.edges[j].from === this.nodes[i].id || this.edges[j].to === this.nodes[i].id ) {

	                this.incConnections[i][j].isConnected = true;

	            }
	        }
	    }

	    return this.incConnections;
	}

	getAdjList(){

	    let adjList = new Array();

	    this.getAdjMatrix();

	    for(let i=0; i < this.nodes.length; i++) {
		
	        adjList.push([]);

	        for(let j=0; j < this.nodes.length; j++) {
			
	            if(this.adjConnections[i][j]) adjList[i].push(j);

	        }
	    }

	    return adjList;
	}

	depthFirstSearch(nodeID) {

	    let adjList = this.getAdjList();
		//console.log(adjList);
	    const stack = [nodeID];
	    const visited = {};
	    visited[nodeID] = true;
	    let currentVertex;

	    while (stack.length) {

	        currentVertex = stack.pop();
	        this.dfsResult.push(currentVertex);

	        adjList[currentVertex].forEach(neighbor => {

	            if (!visited[neighbor]) {

	                visited[neighbor] = true;
	                stack.push(neighbor);
	            }

	        });
	    }

	}

	breadthFirstSearch(nodeID) {

	    let adjList = this.getAdjList();

	    const queue = [nodeID];
	    const visited = {};
	    visited[nodeID] = true;
	    let currentVertex;

	    while (queue.length) {

	        currentVertex = queue.shift();
	        this.bfsResult.push(currentVertex);

	        adjList[currentVertex].forEach(neighbor => {

	            if (!visited[neighbor]) {

	                visited[neighbor] = true;
	                queue.push(neighbor);
	            }

	        });
	    }
	}

	degreeSort() {
			
	    let sortedNodes = [];

	    this.visService.networkInstance.body.data.nodes.get().forEach( (node) => {

	        sortedNodes.push({
	            id: node.id,
	            degree: this.visService.networkInstance.getConnectedEdges(node.id).length,
	            color: ''
	        });

	    });
			
	    sortedNodes.sort( (a, b) => { return a.degree > b.degree ? -1 : a.degree < b.degree ? 1 : 0; } );
			
	    return sortedNodes;
	}

	randSort() {

	    let sortedNodes = [];

	    this.visService.networkInstance.body.data.nodes.get().forEach( (node) => {

	        sortedNodes.push({
	            id: node.id,
	            degree: this.visService.networkInstance.getConnectedEdges(node.id).length,
	            color: ''
	        });

	    });
			
	    sortedNodes.sort( (a, b) => { return 0.5 - Math.random(); } );
			
	    return sortedNodes;
	}

	adjSort() {

	    let sortedNodes = [];

	    this.visService.networkInstance.body.data.nodes.get().forEach( (node) => {

	        sortedNodes.push({
	            id: node.id,
	            degree: this.visService.networkInstance.getConnectedEdges(node.id).length,
	            color: ''
	        });

	    });
			
	    return sortedNodes;
	}

	setStartNode() {
	    if(this.selectedNodeID !== this.startNodeID) {

	        this.visService.networkInstance.body.data.nodes.update({id: this.selectedNodeID, color: { border: '#ff4081', background: '#ffa4c3' }});

	        if(this.startNodeID.length) this.visService.networkInstance.body.data.nodes.update({id: this.startNodeID, color: { background: "#6a87af", border: "#48648b" }});

	        this.startNodeID = this.selectedNodeID;

	        this.searchGraph();

	    } else {

	        this.visService.networkInstance.body.data.nodes.update({id: this.selectedNodeID, color: { background: "#6a87af", border: "#48648b" }});

	        this.startNodeID = "";
	    }

	}

	searchGraph() {
	    let startNodeIndex = this.nodes.indexOf( this.nodes.find(node => (node.id === this.startNodeID)) );
	    this.dfsResult = [];
	    this.bfsResult = [];

	    if(startNodeIndex !== -1) {

	    	this.depthFirstSearch(startNodeIndex);
	    	this.breadthFirstSearch(startNodeIndex);

	    }

	}
}
