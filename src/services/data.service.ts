import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';
import { Network, Node, Edge} from 'vis-network';
import { DataSet } from "vis-data";

import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from 'src/components/mat-components/dialogs/save-dialog/save-dialog.component';
import { SaveDialogNewComponent } from 'src/components/mat-components/dialogs/save-dialog-new/save-dialog-new.component';
import { SnackBarService } from './snack-bar.service';
import { DeleteConfirmComponent } from 'src/components/mat-components/dialogs/delete-confirm/delete-confirm.component';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(public graphService: GraphService, public dialog: MatDialog, public snackBarService: SnackBarService) { }

  currentTitle = ""
  graphList = []
  isDeleteProject = false

  switchDeleteProjectMode() {
      this.isDeleteProject = !this.isDeleteProject;
  }

  graphListEdit(container, title){
      if(this.isDeleteProject){
          this.dialog.open(DeleteConfirmComponent, {data: {container: container, title: title}});
      }
      else {
          this.loadGraph(container, title);
      }
  }

  createNewGraph(container) {

      let nodes = new DataSet<Node>([]);
      let edges = new DataSet<Edge>([]);

      this.graphService.buildGraph(container, {nodes: nodes, edges: edges});

      this.currentTitle = "";
      this.graphService.startNodeID = "";
    
  }

  deleteGraph(container, title){

      if(title === this.currentTitle) this.createNewGraph(container);

      let find = this.graphList.find(i => i.title === title);
      let index = this.graphList.indexOf(find);

      if (index > -1) {
          this.graphList.splice(index, 1);
      }

      localStorage.removeItem(title);
      this.snackBarService.openSnackBar("Usunięto " + title + ".");  
  }

  loadGraph(container, title) {
    
      this.currentTitle = title;

      let nodes = JSON.parse(localStorage.getItem(title)).data.nodes as DataSet<Node>;
      let edges = JSON.parse(localStorage.getItem(title)).data.edges as DataSet<Edge>;

      this.graphService.buildGraph(container, {nodes: nodes, edges: edges});

      this.loadOptions();
      this.snackBarService.openSnackBar("Wczytano " + title + "!");
  }

  saveAndCreateNew(container, isNew) {

      if(this.currentTitle === "") {
     
          if(isNew) this.dialog.open(SaveDialogNewComponent, {data: {container: container}});
          else this.dialog.open(SaveDialogComponent, {data: {container: container}});

      } else {

          let graph = {
              title: this.currentTitle,
              data: {
                  nodes: this.graphService.networkInstance.body.data.nodes.get(),
                  edges: this.graphService.networkInstance.body.data.edges.get()
              }
          };

          console.log(graph);
          localStorage.setItem(this.currentTitle, JSON.stringify(graph));

          this.snackBarService.openSnackBar("Zapisano " + this.currentTitle + "!");

          if(isNew) this.createNewGraph(container);
      }
  
  }

  getGraphList() {

      let arr = [];
      let keys = Object.keys(localStorage),
          i = keys.length;

      while ( i-- ) {
          arr.push(JSON.parse(localStorage.getItem(keys[i])));
          this.graphList = arr;
      }

  }

  loadOptions(){

      this.graphService.changeNodeLabel();
      this.graphService.changeEdgeLabel();
      this.graphService.changePhysics();
      this.graphService.changeSmooth();
      this.graphService.resetGraph();
      this.graphService.startNodeID = "";

  }

}
