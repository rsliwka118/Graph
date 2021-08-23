import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';
import { Node, Edge } from 'vis-network';
import { DataSet } from "vis-data";
import { GraphData } from '../models/graphdata.model'

import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../../editor/navigation/dialogs/save-dialog.component';
import { SaveDialogNewComponent } from '../../editor/navigation/dialogs/save-dialog-new.component';
import { SnackBarService } from './snack-bar.service';
import { DeleteConfirmComponent } from 'src/modules/editor/navigation/dialogs/delete-confirm.component';
import { OptionsService } from './options.service';
import { VisService } from './vis.service';
import { AlgorithmsService } from './algorithms.service';

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
        public algorithmsService: AlgorithmsService) { }

    currentTitle = "";
    graphList = [];
    isDeleteProject = false;
    context: CanvasRenderingContext2D;
    previewGraph: string;

    switchDeleteProjectMode() {
        this.isDeleteProject = !this.isDeleteProject;
    }

    graphListEdit(container, title) {
        if(this.isDeleteProject){
            this.dialog.open(DeleteConfirmComponent, {data: {container: container, title: title}});
        }
        else {
            this.loadGraph(container, title);
        }
    }

    createNewGraph(container) {
        this.graphService.buildGraph(container);

        this.currentTitle = "";
        this.algorithmsService.startNodeID = "";  
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

            let graph = new GraphData(this.currentTitle, this.previewGraph, data);

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
