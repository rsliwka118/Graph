import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, ViewContainerRef} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GraphService } from '../core/services/graph.service';
import { DataService } from 'src/modules/core/services/data.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from 'src/modules/core/services/navigation.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ICONS } from '../core/models/icons.model';
import { OptionsService } from 'src/modules/core/services/options.service';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../core/services/snack-bar.service';
import { HELPER } from '../core/models/keyboardhelper.model';
import { preventDefault } from 'vis-util/esnext';
import { RepresentationAlertComponent } from './navigation/dialogs/representation-alert';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html'
})

export class EditorComponent implements AfterViewInit {
    @ViewChild('network') el: ElementRef
    @ViewChild('snav') public sidenav: MatSidenav;
    @ViewChild('sidenavContent', { read: ViewContainerRef }) sidenavContent: ViewContainerRef;
    
    private id: string;
    private routeSub;
    public keyboardMenu;
    
    constructor( 
        public dialog: MatDialog,
        public graphService: GraphService,
        public bottomSheet: MatBottomSheet,
        public dataService: DataService,
        public navigationService: NavigationService,
        public iconRegistry: MatIconRegistry,
        private cd: ChangeDetectorRef,
        public sanitizer: DomSanitizer,
        public options: OptionsService,
        public algorithmsService: AlgorithmsService,
        private Activatedroute:ActivatedRoute,
        private router: Router,
        private snackBarService: SnackBarService) {
        
        this.keyboardMenu = HELPER;

        ICONS.map( i => {
            iconRegistry.addSvgIconLiteral(i.name, sanitizer.bypassSecurityTrustHtml(i.icon));
        })
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        return this.id && this.graphService.hasChanges ? false : true;
    } 

    ngAfterViewInit(): void {

        this.routeSub = this.Activatedroute.paramMap.subscribe(params => { 
            this.dataService.getGraphList();
            this.id = params.get('id'); 
            this.graphService.hasChanges = false;

            if(this.id){
                let graph = this.id.includes('example') ? this.dataService.examples.find(e => e.id === this.id) : this.dataService.graphList.find(g => g.id === this.id);
                
                if( graph === undefined){
                    this.snackBarService.openSnackBar("Nie znaleziono projektu.");
                    this.router.navigate(['/editor']);
                } else {
                    if(graph !== undefined) {
                        this.dataService.loadGraph(this.el, graph);
                    }
                    if(graph.data.nodes.length > 15 && this.options.enableMatrix) {
                        this.dialog.open(RepresentationAlertComponent);
                    }  
                }
               
            } else {
                this.graphService.buildGraph(this.el);
            }
        });

        this.navigationService.setSidenav(this.sidenav, this.sidenavContent);
        this.cd.detectChanges();
        //localStorage.clear();
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}