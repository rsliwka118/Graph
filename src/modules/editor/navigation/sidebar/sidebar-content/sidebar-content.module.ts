import { NgModule } from '@angular/core';
import { AlgorithmsComponent } from './algorithms/algorithms.component';
import { AdjacencyListComponent } from './representations/adjacency-list.component';
import { AdjacencyMatrixComponent } from './representations/adjacency-matrix.component';
import { IncidenceMatrixComponent } from './representations/incidence-matrix.component';
import { RepresentationsComponent } from './representations/representations.component';
import { SidebarContentComponent } from './sidebar-content.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
    declarations: [
        AdjacencyMatrixComponent,
        IncidenceMatrixComponent,
        AdjacencyListComponent,
        RepresentationsComponent,
        AlgorithmsComponent,
        SidebarContentComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SidebarContentComponent
    ]
})
export class SidebarContentModule {}
