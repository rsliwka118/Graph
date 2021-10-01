import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnimationService } from 'src/modules/core/services/animation.service';
import { GraphService } from 'src/modules/core/services/graph.service';
import { InputService } from 'src/modules/core/services/input.service';

@Component({
    selector: 'app-animation-panel',
    template: `
        <button (click)="animationService.animationStart()" [disabled]="animationService.isAnimationPlayed" #tooltip="matTooltip"
            matTooltipClass="custom-tooltip" matTooltip="{{'EDITOR.NAVIGATION.PANELS.ANIMATION.PLAY' | translate}}" class="animate-button" mat-button>
            <mat-icon [ngStyle]="{'opacity' : animationService.isAnimationPlayed ? '50%' : '100%' }" svgIcon="play-icon">
            </mat-icon>
         </button>
        <button (click)="animationService.exitAnimate()" #tooltip="matTooltip" matTooltipClass="custom-tooltip" matTooltip="{{'EDITOR.NAVIGATION.PANELS.ANIMATION.CLOSE' | translate}}"
            class="animate-button" mat-button>
            <mat-icon svgIcon="stop-icon"></mat-icon>
        </button>
        <br>
        <mat-form-field color="accent" appearance="fill" style="margin-top: 2px">
            <mat-label>{{'EDITOR.NAVIGATION.PANELS.ANIMATION.TEXT' | translate}}</mat-label>
            <input [disabled]="animationService.isAnimationPlayed" matInput min="0" type="number" autocomplete="off"
                (keyup)="animationService.editAnimationSpeed($event)" [(ngModel)]="this.animationService.animationSpeed"
                (focus)="inputService.isTyping = true" (focusout)="inputService.isTyping = false">
            <span [ngStyle]="{'opacity' : animationService.isAnimationPlayed ? '50%' : '100%' }" matSuffix>s</span>
        </mat-form-field>
    `
})
export class AnimationPanelComponent implements OnInit {

    constructor(
        public graphService: GraphService,
        public animationService: AnimationService,
        public inputService: InputService,
        public translate: TranslateService) { }

    ngOnInit(): void {
    }

}
