import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
    selector: 'app-sidebar-content',
    template: `
        <div *ngIf="!navigationService.isRepresentationOpen">
            <app-representations></app-representations>
        </div>
        <div *ngIf="!navigationService.isAlgOpen">
            <app-algorithms></app-algorithms>
        </div>
    `
})
export class SidebarContentComponent implements OnInit {

    constructor(public navigationService: NavigationService) { }

    ngOnInit(): void {
        this.navigationService.isSidenavContentLoaded = true;
    }
}
