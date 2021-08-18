import { Injectable } from '@angular/core';
import { OptionsService } from './options.service';
import { VisService } from './vis.service';

@Injectable({
  	providedIn: 'root'
})
export class AlgorithmsService {

	nodes: any;
  	edges: any;
	adjConnections: boolean[][];
	incConnections: boolean[][];
	dfsResult: number[];
	bfsResult: number[];
	startNodeID = '';
	selectedNodeID;
	selectedEdgeID;

	constructor(public options: OptionsService, private visService: VisService) {
	    this.adjConnections = [];
     	this.incConnections = [];
	    this.startNodeID = '';
	    this.selectedNodeID = null;
	    this.selectedEdgeID = null;
	}

	clickAdjMatrix(node1Index ,node2Index) {

	    let nodes = this.getNodes();
	    let edges = this.getEdges();

	    if(this.adjConnections[node1Index][node2Index]) {

	        let edge1 = edges.find(e => (e.from === nodes[node1Index].id && e.to === nodes[node2Index].id)) ? edges.find(e => (e.from === nodes[node1Index].id && e.to === nodes[node2Index].id)) : null;
	        let edge2 = edges.find(e => (e.to === nodes[node1Index].id && e.from === nodes[node2Index].id)) ? edges.find(e => (e.to === nodes[node1Index].id && e.from === nodes[node2Index].id)) : null;

	        if(edge1 !== null) this.visService.networkInstance.body.data.edges.remove(edge1.id);
	        if(edge2 !== null) this.visService.networkInstance.body.data.edges.remove(edge2.id);

	    } else {

	        let node1Id = nodes[node1Index].id;
	        let node2Id = nodes[node2Index].id;
		
	        this.visService.networkInstance.body.data.edges.add([{from: node1Id, to: node2Id, label: "0"}]);
	    }

	    this.getMatrix();
		
	}

	clickIncMatrix(nodeIndex, edgeIndex){

	    let nodes = this.getNodes();
	    let edges = this.getEdges();

	    let nodeId = nodes[nodeIndex].id;
	    let edgeId = edges[edgeIndex].id;

	    if(!this.adjConnections[nodeIndex][edgeIndex]) {

	        if( edges[edgeIndex].from === "" && edges[edgeIndex].to === "" )
	            this.visService.networkInstance.body.data.edges.update([{ id: edgeId, from: nodeId, to: nodeId, label: "0"}]);

	    } else {

	        if(edges[edgeIndex].from === edges[edgeIndex].to) {

	            this.visService.networkInstance.body.data.edges.update([{ id: edgeId, from: "", to: "", label: "0"}]);

	        } else {

	            if(edges[edgeIndex].from === nodeId) this.visService.networkInstance.body.data.edges.update([{ id: edgeId, from: nodeId, label: "0"}]);

	            else this.visService.networkInstance.body.data.edges.update([{ id: edgeId, to: nodeId, label: "0"}]);

	        }
	    }

	    this.getMatrix();

	}

	getMatrix() {

	    if(this.options.enableMatrix) {
			
	        let nodes = this.getNodes();
	        let edges = this.getEdges();

	        this.getIncMatrix(nodes, edges);
	        this.getAdjMatrix(nodes, edges);
			
	    }
	}

	getAdjMatrix(nodes, edges) {

	    if(nodes.length) this.adjConnections = new Array(nodes.length).fill(false).map(() => new Array(nodes.length).fill(false));
		
	    for(let i=0; i < nodes.length ; i++){

	        for(let j=0; j < nodes.length ; j++) {
			
	            if( (edges.find(e => (e.from === nodes[i].id && e.to === nodes[j].id))) || 
					(edges.find(e => (e.to === nodes[i].id && e.from === nodes[j].id)))
	            ) {
	                this.adjConnections[i][j] = true;
	            }
	        }
	    }

	    return this.adjConnections;

	}

	getIncMatrix(nodes, edges){

	    if(nodes.length && edges.length) this.incConnections = new Array(nodes.length).fill(false).map(() => new Array(edges.length).fill(false));
		
	    for(let i=0; i < nodes.length ; i++) {

	        for(let j=0; j < edges.length ; j++) {
			
	            if( edges[j].from === nodes[i].id || edges[j].to === nodes[i].id ) {

	                this.incConnections[i][j] = true;

	            }
	        }
	    }

	    return this.incConnections;
	}

	getAdjList(nodes, edges){

	    let adjList = new Array();
	    let adjArr = this.getAdjMatrix(nodes, edges);

	    for(let i=0; i < nodes.length; i++) {
		
	        adjList.push([]);

	        for(let j=0; j < nodes.length; j++) {
			
	            if(adjArr[i][j]) adjList[i].push(j);

	        }
	    }

	    return adjList;
	}

	depthFirstSearch(nodeID) {

	    let nodes = this.getNodes();
	    let edges = this.getEdges();

	    let adjList = this.getAdjList(nodes, edges);

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

	    let nodes = this.getNodes();
	    let edges = this.getEdges();

	    let adjList = this.getAdjList(nodes, edges);

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

	getNodes(){
	    this.nodes = this.visService.networkInstance.body.data.nodes.get();

	    return this.nodes;
	}

	getEdges(){
	    this.edges = this.visService.networkInstance.body.data.edges.get();

	    return this.edges;
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
        
	    let nodes = this.getNodes();
	    let startNodeIndex = nodes.indexOf( nodes.find(node => (node.id === this.startNodeID)) );
	    this.dfsResult = [];
	    this.bfsResult = [];

	    this.depthFirstSearch(startNodeIndex);
	    this.breadthFirstSearch(startNodeIndex);

	}
}
