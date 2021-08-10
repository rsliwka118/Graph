import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})

export class NavigationService {

    private sidenav: MatSidenav;
    
    isNavOpen = false
    isRepresentationOpen = true
    isAlgOpen = true

    constructor() { }

    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }


    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
        this.sidenav.toggle();
    }
   
    public openRepresentationsPanel(): boolean {
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
        if(this.isNavOpen && this.isAlgOpen) {

            this.isAlgOpen = false;
    
            return false;

        } else {

            this.isAlgOpen = false;
            this.isRepresentationOpen = true;

            return true;
        }
    }
}
