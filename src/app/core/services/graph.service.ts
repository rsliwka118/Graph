import { Injectable } from '@angular/core';
import { Network, Node, Edge } from 'vis-network';
import { Graph } from '../models/graph.model';
import { DataSet } from "vis-data";
import { AlgorithmsService } from './algorithms.service';
import { VisService } from './vis.service';

const nodes = new DataSet<Node>([]);
const edges = new DataSet<Edge>([]);

@Injectable({
    providedIn: 'root'
})

export class GraphService {

	inAnimateMode = false;
	inAddNodeMode = false;
	inAddEdgeMode = true;
	nodeSelected = false;
	edgeSelected = false;
	nodeLabel = null;
	edgeWeight = null;
	isAddNode = false;
	isAddEdge = false;
	isEditEdge = false;

	constructor( private algorithmsService: AlgorithmsService, private visService: VisService) {
		
	}

  	public buildGraph(cont, data){
			
	    let container = cont.nativeElement;
	    this.visService.networkInstance = new Network(container, data, Graph.option);


	    this.algorithmsService.getMatrix();
	    this.selectedListener();

	    this.visService.networkInstance.on("dragEnd", (() => {

	        this.visService.networkInstance.body.data.nodes.get().forEach( item => {
				
	            let positions = this.visService.networkInstance.getPositions(item.id);
				
	            item.x = positions[item.id].x;
	            item.y = positions[item.id].y;

	        });
			
	    }));
  	}
	
	getGraph(){
	    let data = {
	        nodes: nodes,
	        edges: edges
	    };

	    return data;
	}

	selectedListener(){

	    this.visService.networkInstance.on("click", (params => {

	        this.nodeSelected = (params.nodes.length > 0) ? true : false;

	        this.edgeSelected = (params.edges.length > 0 && params.nodes.length == 0 ) ? true : false;

	        this.editNodeListener(params);
	        this.editEdgeListener(params);
	    }));

	}

	editNodeListener(params){

	    if(params.nodes.length > 0) {
	        let nodeId = params.nodes[0];
	        let node = this.visService.networkInstance.body.data.nodes.get(nodeId);

	        this.nodeLabel = node['label'].substring(1, node['label'].length-1);
	        this.algorithmsService.selectedNodeID = node['id'];

	    } else {
	        this.nodeLabel = null;
	        this.algorithmsService.selectedNodeID = null;
	    }

	}

	editEdgeListener(params){
		
	    this.isAddEdge = false;
			
	    if(params.edges.length > 0 && params.nodes.length == 0) {
	        let edgeId = params.edges[0];
	        let edge = this.visService.networkInstance.body.data.edges.get(edgeId);

	        if(edge['label'] !== null) this.edgeWeight = edge['label'];
	        this.algorithmsService.selectedEdgeID = edge['id'];

	    } else {
	        this.edgeWeight = null;
	        this.algorithmsService.selectedEdgeID = null;
	    }
	}

	getStartNode(): boolean{
	    return this.algorithmsService.selectedNodeID === this.algorithmsService.startNodeID;
	}

	isStartNodeSet(): boolean {
	    return this.algorithmsService.startNodeID !== '' ? true : false;
	}

	resetGraph(){
	    this.visService.networkInstance.body.data.nodes.get().forEach(node => {
	        this.visService.networkInstance.body.data.nodes.update({id: node.id, color: { background: "#6a87af", border: "#48648b" }, font: { size: 30 }});
	    });
	}

	editNodeLabel(label) {
	    if(this.algorithmsService.selectedNodeID !== "") {
	        this.visService.networkInstance.body.data.nodes.update({id: this.algorithmsService.selectedNodeID, label: label});
	    }
	}

	editEdgeWeight(weight){
	    if(this.algorithmsService.selectedEdgeID !== ""){
	        let edge = this.visService.networkInstance.body.data.edges.get(this.algorithmsService.selectedEdgeID);
	        this.visService.networkInstance.body.data.edges.update({id: this.algorithmsService.selectedEdgeID, from: edge['from'], to: edge['to'], label: weight});
	    }
	}

	getNodeLabel(id): string {

	    return id.length ? this.visService.networkInstance.body.data.nodes.get(id).label : "";

	}

	addNode() {
	    if(!this.inAnimateMode) {
	        this.visService.networkInstance.addNodeMode();
			
	        this.algorithmsService.getMatrix();
	    }

	    this.isAddNode = true;
	    this.isAddEdge = false;
	    this.isEditEdge = false;
	}

	disableEditMode(){
	    this.visService.networkInstance.disableEditMode();

	    this.algorithmsService.getMatrix();
	    this.isAddNode = false;
	    this.isAddEdge = false;
	    this.isEditEdge = false;
	}

	deleteSelected(){
	    this.visService.networkInstance.deleteSelected();
	    this.algorithmsService.getMatrix();
	    this.unselect();
	}

	addEdge() {
	    this.visService.networkInstance.addEdgeMode();

	    this.isAddEdge = true;
	    this.isAddNode = false;
	    this.isEditEdge = false;
	    this.unselect();
	}

	editEdge() {
	    this.visService.networkInstance.editEdgeMode();

	    this.isEditEdge = true;
	    this.isAddEdge = false;
	    this.isAddNode = false;
	    this.unselect();
	}

	unselect(){
			
	    this.nodeSelected = false;
	    this.edgeSelected = false;
	    this.nodeLabel = null;
	    this.edgeWeight = null;
	    this.algorithmsService.selectedNodeID = null;
	    this.algorithmsService.selectedEdgeID = null;

	}
}
