import { Injectable } from '@angular/core';
import { Network, Node, Edge } from 'vis-network';
import { Graph } from '../models/graph.model';
import { DataSet } from "vis-data";
import { AlgorithmsService } from './algorithms.service';
import { VisService } from './vis.service';
import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/dir-document-token';

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
	//options: any

	constructor( private algorithmsService: AlgorithmsService, private visService: VisService ) {
		//this.options = new Graph(this.visService.networkInstance)
	}

  	public buildGraph(cont, data?){

		let graphData = data ? data : { nodes: new DataSet<Node>([]), edges: new DataSet<Edge>([]) }
	    let container = cont.nativeElement;
	    this.visService.networkInstance = new Network(container, graphData, this.option);

		this.algorithmsService.getGraph();
	    this.algorithmsService.getMatrix();
	    this.listener();
		
  	}

	listener(){

		this.visService.networkInstance.body.data.nodes.on('*', () => {
			this.algorithmsService.getGraph();
			this.algorithmsService.searchGraph();
			this.algorithmsService.getMatrix();
		});

		this.visService.networkInstance.body.data.edges.on('*', () => {
			this.algorithmsService.getGraph();
			this.algorithmsService.searchGraph();
			this.algorithmsService.getMatrix();
		});

	    this.visService.networkInstance.on("dragEnd", (() => {

	        this.visService.networkInstance.body.data.nodes.get().forEach( item => {
				
	            let positions = this.visService.networkInstance.getPositions(item.id);
				
	            item.x = positions[item.id].x;
	            item.y = positions[item.id].y;

	        });
	    }));

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

	    return id ? this.visService.networkInstance.body.data.nodes.get(id).label : "";

	}

	addNode() {
	    if(!this.inAnimateMode) {
	        this.visService.networkInstance.addNodeMode();
	    }

	    this.isAddNode = true;
	    this.isAddEdge = false;
	    this.isEditEdge = false;
	}

	disableEditMode(){
	    this.visService.networkInstance.disableEditMode();

	    this.isAddNode = false;
	    this.isAddEdge = false;
	    this.isEditEdge = false;
	}

	deleteSelected(){
	    this.visService.networkInstance.deleteSelected();
		if(this.algorithmsService.selectedNodeID === this.algorithmsService.startNodeID) this.algorithmsService.startNodeID = '';
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

	option = {
		nodes: {
			shape: "circle",
	
			font: {
				size: 30,
				color: "#ffffff",
				face: 'Montserrat',
				align: "right"
			},
			borderWidth: 6,
			color: {
				background: "#6a87af",
				border: "#48648b",
				highlight: {
					border: 'rgba(255, 64, 128)',
					background: '#ffa4c3'
				}
			}
		},
		edges: {
			label: '1',
			width: 7,
			length: 300,
			smooth: false,
			color: {
				//inherit: 'both',
				color: '#48648b',
				highlight: '#ff4081'
			},
			font: {
				size: 20,
				color: "#d0dfeb",
				face: 'Montserrat',
				align: 'top',
				strokeWidth: 0
			}
	
		},
		physics: {
			enabled: false,
		},
		manipulation: { enabled: true,
			addNode: (data, callback) => {
				let nodesLength = this.visService.networkInstance.body.data.nodes.length; 

				let generateLabel = (number) => {
					let baseChar = ("A").charCodeAt(0),
						label  = "";
				  
					do {
					  number -= 1;
					  label = String.fromCharCode(baseChar + (number % 26)) + label;
					  number = (number / 26) >> 0;
					} while(number > 0);
				  
					return ' ' + label + ' ';
				}
				
				data.label = generateLabel(nodesLength + 1);

				this.visService.networkInstance.body.data.nodes.add(data);
			},
			addEdge: (data, callback) => {
				data.label = "1"
				this.visService.networkInstance.body.data.edges.add(data);
			},
		},
		interaction:{
			multiselect: true
		}
	};
}

