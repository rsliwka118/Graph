import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';
import { Node, Edge } from 'vis-network';
import { DataSet } from "vis-data";
import { GraphData } from '../models/graphdata.model'
import { v4 as uuidv4 } from 'uuid';

import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../../editor/navigation/dialogs/save-dialog.component';
import { SaveDialogNewComponent } from '../../editor/navigation/dialogs/save-dialog-new.component';
import { SnackBarService } from './snack-bar.service';
import { DeleteConfirmComponent } from 'src/modules/editor/navigation/dialogs/delete-confirm.component';
import { OptionsService } from './options.service';
import { VisService } from './vis.service';
import { AlgorithmsService } from './algorithms.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        public graphService: GraphService,
        public dialog: MatDialog, 
        public snackBarService: SnackBarService,
        private options: OptionsService,
        private visService: VisService,
        public algorithmsService: AlgorithmsService,
        private router: Router) { }

    currentTitle = "";
    currentId = "";
    graphList = [];
    isDeleteProject = false;
    context: CanvasRenderingContext2D;
    previewGraph: string;

    switchDeleteProjectMode() {
        this.isDeleteProject = !this.isDeleteProject;
    }

    graphListEdit(container, title, id) {
        if(this.isDeleteProject){
            this.dialog.open(DeleteConfirmComponent, {data: {container: container, title: title, id: id}});
        }
        else {
            this.router.navigate(['/editor/'+ id]);
        }
    }

    createNewGraph(container) {
        this.currentTitle = "";
        this.currentId = "";
        this.algorithmsService.startNodeID = ""; 
        this.router.navigate(['/editor']);

        this.graphService.buildGraph(container);
    }

    deleteGraph(container, title, id){
        
        if(id === this.currentId) this.createNewGraph(container);

        let find = this.graphList.find(i => i.id === id);
        let index = this.graphList.indexOf(find);

        if (index > -1) {
            this.graphList.splice(index, 1);
        }

        localStorage.removeItem(id);
        this.snackBarService.openSnackBar("Usunięto " + title + ".");  
    }

    loadGraph(container, title, id) {

        this.currentTitle = title;
        this.currentId = id;

        let nodes = JSON.parse(localStorage.getItem(id)).data.nodes as DataSet<Node>;
        let edges = JSON.parse(localStorage.getItem(id)).data.edges as DataSet<Edge>;

        this.graphService.buildGraph(container, {nodes: nodes, edges: edges});

        this.options.loadOptions();
        this.graphService.resetGraph();
        this.snackBarService.openSnackBar("Wczytano " + title + "!");
    }

    saveAndCreateNew(container, isNew) {

        if(this.currentTitle === "") {
        
            if(isNew) this.dialog.open(SaveDialogNewComponent, {data: {container: container}});
            else this.dialog.open(SaveDialogComponent, {data: {container: container}});

        } else {

            let data = {
                nodes: this.visService.networkInstance.body.data.nodes.get(),
                edges: this.visService.networkInstance.body.data.edges.get()
            };

            this.previewGraph = data.nodes.length ? this.getPreview() : "";
            this.currentId = this.currentId ? this.currentId : uuidv4();

            let graph = new GraphData(this.currentTitle, this.previewGraph, data, this.currentId);
            localStorage.setItem(this.currentId, JSON.stringify(graph));

            this.snackBarService.openSnackBar("Zapisano " + this.currentTitle + "!");

            if(isNew) this.createNewGraph(container);
            this.router.navigate(['/editor/'+this.currentId]);
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

    getPreview(): string {
        this.context = document.getElementsByTagName("canvas")[0].getContext('2d');

        let ctx = this.context;
        let copy = document.createElement('canvas').getContext('2d'),
        canvas = ctx.canvas,
        w = canvas.width, h = canvas.height,
        pix = {x:[], y:[]},
        imageData = ctx.getImageData(0,0,canvas.width,canvas.height),
        x, y, index;
      
        for (y = 0; y < h; y++) {
          for (x = 0; x < w; x++) {
            index = (y * w + x) * 4;
            if (imageData.data[index+3] > 0) {
              pix.x.push(x);
              pix.y.push(y);
            } 
          }
        }

        pix.x.sort((a,b) => {return a-b});
        pix.y.sort((a,b) => {return a-b});
        let n = pix.x.length-1;
      
        w = 1 + pix.x[n] - pix.x[0];
        h = 1 + pix.y[n] - pix.y[0];
        let cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);
      
        copy.canvas.width = w;
        copy.canvas.height = h;
        copy.putImageData(cut, 0, 0);
        
        return copy.canvas.toDataURL();
      }

}
