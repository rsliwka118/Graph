import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GraphService } from '../core/services/graph.service';
import { DataService } from 'src/modules/core/services/data.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from 'src/modules/core/services/navigation.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Icons } from '../core/models/icons.model';
import { OptionsService } from 'src/modules/core/services/options.service';
import { AlgorithmsService } from 'src/modules/core/services/algorithms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../core/services/snack-bar.service';
import { HELPER } from '../core/models/keyboardhelper.model'

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
        iconRegistry.addSvgIconLiteral('add-icon', sanitizer.bypassSecurityTrustHtml(Icons.ADD_ICON));
        iconRegistry.addSvgIconLiteral('add-icon-active', sanitizer.bypassSecurityTrustHtml(Icons.ADD_ICON_ACTIVE));
        iconRegistry.addSvgIconLiteral('files-icon', sanitizer.bypassSecurityTrustHtml(Icons.FILES_ICON));
        iconRegistry.addSvgIconLiteral('save-icon', sanitizer.bypassSecurityTrustHtml(Icons.SAVE_ICON));
        iconRegistry.addSvgIconLiteral('delete-icon', sanitizer.bypassSecurityTrustHtml(Icons.DELETE_ICON));
        iconRegistry.addSvgIconLiteral('delete-icon-active', sanitizer.bypassSecurityTrustHtml(Icons.DELETE_ICON_ACTIVE));
        iconRegistry.addSvgIconLiteral('new-icon', sanitizer.bypassSecurityTrustHtml(Icons.NEW_ICON));
        iconRegistry.addSvgIconLiteral('edge-icon', sanitizer.bypassSecurityTrustHtml(Icons.ADD_EDGE));
        iconRegistry.addSvgIconLiteral('edge-icon-active', sanitizer.bypassSecurityTrustHtml(Icons.ADD_EDGE_ACTIVE));
        iconRegistry.addSvgIconLiteral('edit-edge-icon', sanitizer.bypassSecurityTrustHtml(Icons.EDIT_EDGE));
        iconRegistry.addSvgIconLiteral('edit-edge-icon-active', sanitizer.bypassSecurityTrustHtml(Icons.EDIT_EDGE_ACTIVE));
        iconRegistry.addSvgIconLiteral('settings-icon', sanitizer.bypassSecurityTrustHtml(Icons.SETTINGS_ICON));
        iconRegistry.addSvgIconLiteral('matrix-icon', sanitizer.bypassSecurityTrustHtml(Icons.MATRIX_ICON));
        iconRegistry.addSvgIconLiteral('alg-icon', sanitizer.bypassSecurityTrustHtml(Icons.ALG_ICON));
        iconRegistry.addSvgIconLiteral('matrix-icon-active', sanitizer.bypassSecurityTrustHtml(Icons.MATRIX_ICON_ACTIVE));
        iconRegistry.addSvgIconLiteral('alg-icon-active', sanitizer.bypassSecurityTrustHtml(Icons.ALG_ICON_ACTIVE));
        iconRegistry.addSvgIconLiteral('graph-icon', sanitizer.bypassSecurityTrustHtml(Icons.GRAPH_ICON));
        iconRegistry.addSvgIconLiteral('arrow-icon', sanitizer.bypassSecurityTrustHtml(Icons.ARROW));
        iconRegistry.addSvgIconLiteral('play-icon', sanitizer.bypassSecurityTrustHtml(Icons.PLAY_ICON));
        iconRegistry.addSvgIconLiteral('pause-icon', sanitizer.bypassSecurityTrustHtml(Icons.PAUSE_ICON));
        iconRegistry.addSvgIconLiteral('stop-icon', sanitizer.bypassSecurityTrustHtml(Icons.STOP_ICON));
        iconRegistry.addSvgIconLiteral('replay-icon', sanitizer.bypassSecurityTrustHtml(Icons.REPLAY_ICON));
        iconRegistry.addSvgIconLiteral('edit-icon', sanitizer.bypassSecurityTrustHtml(Icons.EDIT_ICON));
        iconRegistry.addSvgIconLiteral('edit-icon-active', sanitizer.bypassSecurityTrustHtml(Icons.EDIT_ICON_ACTIVE));
    }

    ngAfterViewInit(): void {

        this.routeSub = this.Activatedroute.paramMap.subscribe(params => { 
            this.dataService.getGraphList();
            this.id = params.get('id'); 
            
            if(this.id){
                let graph = this.dataService.graphList.find(g => g.id === this.id);
                if(graph) {
                    this.dataService.loadGraph(this.el, graph.title, graph.id);
                } else {
                    this.snackBarService.openSnackBar("Nie znaleziono projektu.");
                    this.router.navigate(['/editor']);
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