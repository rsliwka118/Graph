import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationPanelComponent } from './animation-panel.component';
import { EdgePanelComponent } from './edge-panel.component';
import { NodePanelComponent } from './node-panel.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
        NodePanelComponent,
        AnimationPanelComponent,
        EdgePanelComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatTooltipModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule
    ],
    exports: [
        NodePanelComponent,
        AnimationPanelComponent,
        EdgePanelComponent
    ]
})
export class PanelsModule { }
