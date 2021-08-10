import { Component, OnInit } from '@angular/core';
import { AnimationService } from 'src/services/animation.service';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-animation-panel',
    template: `
        <button (click)="graphService.animationStart()" [disabled]="graphService.isAnimationPlayed" #tooltip="matTooltip"
            matTooltipClass="custom-tooltip" matTooltip="Odtwarzaj" class="animate-button" mat-button>
            <mat-icon [ngStyle]="{'opacity' : graphService.isAnimationPlayed ? '50%' : '100%' }" svgIcon="play-icon">
            </mat-icon>
         </button>
        <button (click)="graphService.exitAnimate()" #tooltip="matTooltip" matTooltipClass="custom-tooltip" matTooltip="Zakończ"
            class="animate-button" mat-button>
            <mat-icon svgIcon="stop-icon"></mat-icon>
        </button>
        <br>
        <mat-form-field color="accent" appearance="fill" style="margin-top: 2px">
            <mat-label>Czas przejścia</mat-label>
            <input [disabled]="graphService.isAnimationPlayed" matInput min="0" type="number" autocomplete="off"
                (keyup)="animationService.editAnimationSpeed($event)" [(ngModel)]="this.graphService.animationSpeed">
            <span [ngStyle]="{'opacity' : graphService.isAnimationPlayed ? '50%' : '100%' }" matSuffix>s</span>
        </mat-form-field>
    `
})
export class AnimationPanelComponent implements OnInit {

    constructor( public graphService: GraphService, public animationService: AnimationService ) { }

    ngOnInit(): void {
    }

}
