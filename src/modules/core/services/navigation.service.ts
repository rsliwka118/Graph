import { Injectable, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LazyLoadingService } from './lazyloading.service';

@Injectable({
    providedIn: 'root'
})

export class NavigationService {

    private sidenav: MatSidenav;
    private sidenavContent: ViewContainerRef;

    isNavOpen = false;
    isRepresentationOpen = false;
    isAlgOpen = true;
    isSidenavContentLoaded = false;

    constructor(private lazyLoadingService: LazyLoadingService) { }

    public setSidenav(sidenav: MatSidenav, sidenavContent: ViewContainerRef) {
        this.sidenav = sidenav;
        this.sidenavContent = sidenavContent;
    }

    public toggle(): void {
        this.sidenav.toggle();
    }
   
    public openRepresentationsPanel(): boolean {

        //if(!this.isSidenavContentLoaded) this.loadSidenavContent();

        if(this.isNavOpen && this.isRepresentationOpen) {

            this.isRepresentationOpen = false;

            return false;

        } else {

            this.isRepresentationOpen = false;
            this.isAlgOpen = true;

            return true;
        }
    }

    public openAlgorithmsPanel(): boolean {

       // if(!this.isSidenavContentLoaded) this.loadSidenavContent();

        if(this.isNavOpen && this.isAlgOpen) {

            this.isAlgOpen = false;
    
            return false;

        } else {

            this.isAlgOpen = false;
            this.isRepresentationOpen = true;

            return true;
        }
    }

    async loadSidenavContent() {
        this.lazyLoadingService.loadModule(this.sidenavContent, await import('../../editor/navigation/sidebar/sidebar-content/sidebar-content.module').then(m => m.SidebarContentModule));
        this.lazyLoadingService.createComponent(this.sidenavContent, "app-sidebar-content");
    }
}
