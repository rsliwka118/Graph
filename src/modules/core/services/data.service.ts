import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';
import { GraphData } from '../models/graphdata.model';
import { v4 as uuidv4 } from 'uuid';

import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from './snack-bar.service';
import { DeleteConfirmComponent } from 'src/modules/editor/navigation/dialogs/delete-confirm.component';
import { OptionsService } from './options.service';
import { VisService } from './vis.service';
import { AlgorithmsService } from './algorithms.service';
import { Router } from '@angular/router';
import { EditDialogComponent } from 'src/modules/editor/navigation/dialogs/edit-dialog.component';
import { EXAMPLES } from '../models/examples.model';
import { TranslateService } from '@ngx-translate/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(
        public graphService: GraphService,
        public dialog: MatDialog, 
        public snackBarService: SnackBarService,
        private options: OptionsService,
        public bottomSheet: MatBottomSheet,
        private visService: VisService,
        public algorithmsService: AlgorithmsService,
        private router: Router,
        private translate: TranslateService) {
        this.examples = EXAMPLES;
    }

    currentTitle = "";
    currentId = "";
    graphList = [];
    examples = [];
    isDeleteProject = false;
    isEditProject = false;
    context: CanvasRenderingContext2D;
    previewGraph: string;

    createNewGraph(container) {
        this.currentTitle = "";
        this.currentId = "";
        this.algorithmsService.startNodeID = ""; 
        this.router.navigate(['/editor']);

        this.graphService.buildGraph(container);
    }

    deleteGraph(container, title, id) {
        
        if(id === this.currentId) this.createNewGraph(container);

        let find = this.graphList.find(i => i.id === id);
        let index = this.graphList.indexOf(find);

        if (index > -1) {
            this.graphList.splice(index, 1);
        }

        localStorage.removeItem(id);
        this.snackBarService.openSnackBar(this.translate.instant('TOASTS.DELETE') + " " + title + ".");  
    }

    loadGraph(container, graph) {

        this.currentTitle = graph.title;
        this.currentId = graph.id;
        let graphData = graph.data;

        this.graphService.buildGraph(container, graphData);

        this.options.loadOptions();
        this.graphService.resetGraph();
        this.snackBarService.openSnackBar(this.translate.instant('TOASTS.LOADED') + " " + this.translate.instant(graph.title) + "!");
    }

    saveGraph(){
        this.graphService.resetGraph();

        let data = {
            nodes: this.visService.networkInstance.body.data.nodes.get(),
            edges: this.visService.networkInstance.body.data.edges.get()
        };

        this.previewGraph = data.nodes.length ? this.getPreview() : "";
        this.currentId = this.currentId && !this.currentId.includes('example') ? this.currentId : uuidv4();
        
        let graph = new GraphData(this.currentTitle, this.previewGraph, data, this.currentId);
        localStorage.setItem(this.currentId, JSON.stringify(graph));

        this.snackBarService.openSnackBar(this.translate.instant('TOASTS.SAVED') + " " + this.currentTitle + "!");
        this.router.navigate(['/editor/' + this.currentId]);

        this.graphService.hasChanges = false;
    }

    editGraph(title, id) {
        
        let graph = JSON.parse(localStorage.getItem(id));
        graph.title = title;
        
        localStorage.setItem(id, JSON.stringify(graph));
        this.snackBarService.openSnackBar(this.translate.instant('TOASTS.EDIT') + " " + title + "!");
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

        pix.x.sort((a,b) => {return a-b;});
        pix.y.sort((a,b) => {return a-b;});
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
