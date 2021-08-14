import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmsComponent } from './algorithms/algorithms.component';
import { AdjacencyListComponent } from './representations/adjacency-list.component';
import { AdjacencyMatrixComponent } from './representations/adjacency-matrix.component';
import { IncidenceMatrixComponent } from './representations/incidence-matrix.component';
import { RepresentationsComponent } from './representations/representations.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AdjacencyMatrixComponent,
    IncidenceMatrixComponent,
    AdjacencyListComponent,
    RepresentationsComponent,
    AlgorithmsComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [
    AdjacencyMatrixComponent,
    IncidenceMatrixComponent,
    AdjacencyListComponent,
    RepresentationsComponent,
    AlgorithmsComponent
  ]
})
export class SidebarContentModule { }
