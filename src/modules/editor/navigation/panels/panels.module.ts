import { NgModule } from '@angular/core';
import { AnimationPanelComponent } from './animation-panel.component';
import { EdgePanelComponent } from './edge-panel.component';
import { NodePanelComponent } from './node-panel.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatModule } from 'src/modules/mat/mat.module';

@NgModule({
    declarations: [
        NodePanelComponent,
        AnimationPanelComponent,
        EdgePanelComponent
    ],
    imports: [
        SharedModule,
        MatModule
    ],
    exports: [
        NodePanelComponent,
        AnimationPanelComponent,
        EdgePanelComponent
    ]
})
export class PanelsModule { }
