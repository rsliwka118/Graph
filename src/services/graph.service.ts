import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Network, Node, Edge } from 'vis-network';
import { DataSet } from "vis-data";
import mix from 'mix-color';

const nodes = new DataSet<Node>([]);

const edges = new DataSet<Edge>([]);

@Injectable({
    providedIn: 'root'
})

export class GraphService {

  adjConnections: boolean[][]
  incConnections: boolean[][]
  dfsResult: number[]
  bfsResult: number[]

  public networkInstance: any
  loadedNodes: any
  loadedEdges: any

  animatePauseIndex = null
  animatedNodes = []
  animationSpeed = 1
  inAnimateMode = false
  isAnimationPlayed = false
  inAddNodeMode = false
  inAddEdgeMode = true
  nodeSelected = false
  edgeSelected = false
  enablePhysics = false
  enableSmooth = false
  enableMatrix = false
  enableEdgeLabel = false
  enableNodeLabel = false
  enableGrid = true
  nodeLabel = null
  edgeWeight = null
  selectedNodeID = null
  selectedEdgeID = null
  startNodeID = ""
  isAddNode = false
  isAddEdge = false
  isEditEdge = false
  colors: string[]

  constructor() {

      this.adjConnections = [];
      this.incConnections = [];
      this.getRandomColors(1000);

  }

  public buildGraph(cont, data){

      let container = cont.nativeElement;
      this.networkInstance = new Network(container, data, this.option);
    
      this.getMatrix();
      this.selectedListener();

      this.networkInstance.on("dragEnd", (() => {

          this.networkInstance.body.data.nodes.get().forEach( item => {
        
              let positions = this.networkInstance.getPositions(item.id);
        
              item.x = positions[item.id].x;
              item.y = positions[item.id].y;

          });
      
      }));
  }

  selectedListener(){

      this.networkInstance.on("click", (params => {

          this.nodeSelected = (params.nodes.length > 0) ? true : false;

          this.edgeSelected = (params.edges.length > 0 && params.nodes.length == 0 ) ? true : false;

          this.editNodeListener(params);
          this.editEdgeListener(params);
      }));

  }

  editNodeListener(params){

      if(params.nodes.length > 0) {
          let nodeId = params.nodes[0];
          let node = this.networkInstance.body.data.nodes.get(nodeId);

          this.nodeLabel = node['label'].substring(1, node['label'].length-1);
          this.selectedNodeID = node['id'];

      } else {
          this.nodeLabel = null;
          this.selectedNodeID = null;
      }

  }

  editEdgeListener(params){
  
      this.isAddEdge = false;
    
      if(params.edges.length > 0 && params.nodes.length == 0) {
          let edgeId = params.edges[0];
          let edge = this.networkInstance.body.data.edges.get(edgeId);

          if(edge['label'] !== null) this.edgeWeight = edge['label'];
          this.selectedEdgeID = edge['id'];

      } else {
          this.edgeWeight = null;
          this.selectedEdgeID = null;
      }
  }

  getStartNode(): boolean{
      return this.selectedNodeID === this.startNodeID;
  }

  isStartNodeSet(): boolean {
      return this.startNodeID.length ? true : false;
  }

  setStartNode() {
  
      if(this.selectedNodeID !== this.startNodeID) {

          this.networkInstance.body.data.nodes.update({id: this.selectedNodeID, color: { border: '#ff4081', background: '#ffa4c3' }});

          if(this.startNodeID.length) this.networkInstance.body.data.nodes.update({id: this.startNodeID, color: { background: "#6a87af", border: "#48648b" }});

          this.startNodeID = this.selectedNodeID;

          this.searchGraph();

      } else {

          this.networkInstance.body.data.nodes.update({id: this.selectedNodeID, color: { background: "#6a87af", border: "#48648b" }});

          this.startNodeID = "";
      }

  }

  resetGraph(){
    
      this.networkInstance.body.data.nodes.get().forEach(node => {
      
          this.networkInstance.body.data.nodes.update({id: node.id, color: { background: "#6a87af", border: "#48648b" }, font: { size: 30 }});

      });
    
  }

  editNodeLabel(label) {

      if(this.selectedNodeID !== "") {
          this.networkInstance.body.data.nodes.update({id: this.selectedNodeID, label: label});
      
      }
  }

  editEdgeWeight(weight){

      if(this.selectedEdgeID !== ""){

          let edge = this.networkInstance.body.data.edges.get(this.selectedEdgeID);
          this.networkInstance.body.data.edges.update({id: this.selectedEdgeID, from: edge['from'], to: edge['to'], label: weight});
      
      }
  }

  getGraph(){

      let data = {
          nodes: nodes,
          edges: edges
      };

      return data;
  }

  getNodeLabel(id): string {

      return id.length ? this.networkInstance.body.data.nodes.get(id).label : "";

  }

  getNodes(){
      this.loadedNodes = this.networkInstance.body.data.nodes.get();

      return this.loadedNodes;
  }

  getEdges(){
      this.loadedEdges = this.networkInstance.body.data.edges.get();

      return this.loadedEdges;
  }

  addNode() {
      if(!this.inAnimateMode) {
          this.networkInstance.addNodeMode();
      
          this.getMatrix();
      }

      this.isAddNode = true;
      this.isAddEdge = false;
      this.isEditEdge = false;
  }

  disableEditMode(){
      this.networkInstance.disableEditMode();

      this.getMatrix();
      this.isAddNode = false;
      this.isAddEdge = false;
      this.isEditEdge = false;
  }

  deleteSelected(){
      this.networkInstance.deleteSelected();
      this.getMatrix();
      this.unselect();
  }

  addEdge() {
      this.networkInstance.addEdgeMode();

      this.isAddEdge = true;
      this.isAddNode = false;
      this.isEditEdge = false;
      this.unselect();
  }

  editEdge() {
      this.networkInstance.editEdgeMode();

      this.isEditEdge = true;
      this.isAddEdge = false;
      this.isAddNode = false;
      this.unselect();
  }

  private unselect(){
    
      this.nodeSelected = false;
      this.edgeSelected = false;
      this.nodeLabel = null;
      this.edgeWeight = null;
      this.selectedNodeID = null;
      this.selectedEdgeID = null;

  }

  clickAdjMatrix(node1Index ,node2Index){

      let nodes = this.getNodes();
      let edges = this.getEdges();

      if(this.adjConnections[node1Index][node2Index]) {

          let edge1 = edges.find(e => (e.from === nodes[node1Index].id && e.to === nodes[node2Index].id)) ? edges.find(e => (e.from === nodes[node1Index].id && e.to === nodes[node2Index].id)) : null;
          let edge2 = edges.find(e => (e.to === nodes[node1Index].id && e.from === nodes[node2Index].id)) ? edges.find(e => (e.to === nodes[node1Index].id && e.from === nodes[node2Index].id)) : null;

          if(edge1 !== null) this.networkInstance.body.data.edges.remove(edge1.id);
          if(edge2 !== null) this.networkInstance.body.data.edges.remove(edge2.id);

      } else {

          let node1Id = nodes[node1Index].id;
          let node2Id = nodes[node2Index].id;
      
          this.networkInstance.body.data.edges.add([{from: node1Id, to: node2Id, label: "0"}]);
      }

      this.getMatrix();
    
  }

  clickIncMatrix(nodeIndex, edgeIndex){

      let nodes = this.getNodes();
      let edges = this.getEdges();

      let nodeId = nodes[nodeIndex].id;
      let edgeId = edges[edgeIndex].id;

      if(!this.adjConnections[nodeIndex][edgeIndex]) {

          if( edges[edgeIndex].from === "" && edges[edgeIndex].to ==="" )
              this.networkInstance.body.data.edges.update([{ id: edgeId, from: nodeId, to: nodeId, label: "0"}]);

      } else {

          if(edges[edgeIndex].from === edges[edgeIndex].to) {

              this.networkInstance.body.data.edges.update([{ id: edgeId, from: "", to: "", label: "0"}]);

          } else {

              if(edges[edgeIndex].from === nodeId) this.networkInstance.body.data.edges.update([{ id: edgeId, from: nodeId, label: "0"}]);

              else this.networkInstance.body.data.edges.update([{ id: edgeId, to: nodeId, label: "0"}]);

          }
      }

      this.getMatrix();

  }

  getMatrix() {

      if(this.enableMatrix) {
    
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

  animateSearch(animatedNodes) {

      this.animatedNodes = animatedNodes;
      this.inAnimateMode = true;

      this.networkInstance.setOptions({
          interaction: {
              dragNodes: false
          }
      });

  }

  animationStart() {

      this.isAnimationPlayed = true;
      this.resetGraph();

      this.animatedNodes.forEach( (node, index) => {

          setTimeout(() => 
          { 
              if(this.isAnimationPlayed) {
                  this.networkInstance.body.data.nodes.update({id: this.loadedNodes[node].id, color: { background: "#ffa4c3", border: "#ff4081" }});
              }
              if( index === this.loadedNodes.length-1) this.isAnimationPlayed = false;
          }, this.animationSpeed * 1000 * index); 
        
      });
  
  }

  exitAnimate() {

      this.inAnimateMode = false;
      this.isAnimationPlayed = false;
      this.animatedNodes = [];

      this.networkInstance.setOptions({
          interaction: {
              dragNodes: true
          }
      });

      this.resetGraph();
      this.networkInstance.body.data.nodes.update({id: this.startNodeID, color: { border: '#ff4081', background: '#ffa4c3' }});
  }

  searchGraph() {
    
      let nodes = this.getNodes();
      let startNodeIndex = nodes.indexOf( nodes.find(node => (node.id === this.startNodeID)) );
      this.dfsResult = [];
      this.bfsResult = [];

      this.depthFirstSearch(startNodeIndex);
      this.breadthFirstSearch(startNodeIndex);

  }

  degreeSort() {
    
      let sortedNodes = [];

      this.networkInstance.body.data.nodes.get().forEach( (node) => {

          sortedNodes.push({
              id: node.id,
              degree: this.networkInstance.getConnectedEdges(node.id).length,
              color: ''
          });

      });
    
      sortedNodes.sort( (a, b) => { return a.degree > b.degree ? -1 : a.degree < b.degree ? 1 : 0; } );
    
      return sortedNodes;
  }

  randSort() {

      let sortedNodes = [];

      this.networkInstance.body.data.nodes.get().forEach( (node) => {

          sortedNodes.push({
              id: node.id,
              degree: this.networkInstance.getConnectedEdges(node.id).length,
              color: ''
          });

      });
    
      sortedNodes.sort( (a, b) => { return 0.5 - Math.random(); } );
    
      return sortedNodes;
  }

  adjSort() {

      let sortedNodes = [];

      this.networkInstance.body.data.nodes.get().forEach( (node) => {

          sortedNodes.push({
              id: node.id,
              degree: this.networkInstance.getConnectedEdges(node.id).length,
              color: ''
          });

      });
    
      return sortedNodes;
  }

  colorNodes(nodes) {
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
      
          let neighbors = this.networkInstance.getConnectedNodes(tab[i].id);
      
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
          this.networkInstance.body.data.nodes.update({id: node.id, color: { background: node.color , border: node.color }});
      });

  }

  degreeColor() {

      let maxDegree = 0;

      this.networkInstance.body.data.nodes.get().forEach( (node) => {
      
          maxDegree = this.networkInstance.getConnectedEdges(node.id).length > maxDegree ? this.networkInstance.getConnectedEdges(node.id).length : maxDegree;

      });

      this.networkInstance.body.data.nodes.get().forEach( (node) => { 

          let degreePercentage = this.networkInstance.getConnectedEdges(node.id).length / maxDegree;

          this.networkInstance.body.data.nodes.update({id: node.id, 
              color: { background: mix('#202124','#ff4080', degreePercentage) , border: mix('#202124','#ff4080', degreePercentage) },
              font: { size: degreePercentage * 100 }
      
          });

      });

  }

  getRandomColors(size){

      let colors = [];

      for(let i = 0; i < size ; i++) {
      
          colors.push( '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6) );
    
      }
    
      this.colors = colors;
  }

  changePhysics() {

      this.networkInstance.setOptions({
          physics: {
              enabled: this.enablePhysics,
          }
      });
  }

  changeSmooth() {

      this.networkInstance.setOptions({
          edges: {   
              smooth: this.enableSmooth
          }
      });
  }

  changeEdgeLabel(){

      this.networkInstance.setOptions({
          edges: {
              font: {
                  size: !this.enableEdgeLabel ? 20 : 0
              }
          }
      });
  }

  changeNodeLabel(){

      this.networkInstance.setOptions({
          nodes: {
              font: {
                  color:  !this.enableNodeLabel ? "#ffffff" : "transparent"
              }
          }
      });
  }

  option = {
      nodes: {
          shape: "circle",

          font: {
              size: 30,
              color:  !this.enableNodeLabel ? "#ffffff" : "transparent",
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
          smooth: !this.enableSmooth,
          color: {
              inherit: 'both',
              //color: '#48648b',
              //highlight: '#ff4081'
          },
          font: {
              size: !this.enableEdgeLabel ? 20 : 0,
              color: "#d0dfeb",
              face: 'Montserrat',
              align: 'top',
              strokeWidth: 0
          }

      },
      physics: {
          enabled: this.enablePhysics,
      },
      manipulation: { enabled: true },
      interaction:{
          multiselect: true
      }
  }
}
