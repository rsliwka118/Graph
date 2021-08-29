import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { NavigationModule } from './navigation/navigation.module';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../core/services/data.service';
import { SnackBarService } from '../core/services/snack-bar.service';
import { NavigationService } from '../core/services/navigation.service';
import { ColorService } from '../core/services/color.service';
import { AnimationService } from '../core/services/animation.service';
import { GraphService } from '../core/services/graph.service';
import { OptionsService } from '../core/services/options.service';
import { AlgorithmsService } from '../core/services/algorithms.service';
import { SidebarContentModule } from './navigation/sidebar/sidebar-content/sidebar-content.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: EditorComponent,
    },
    {
        path: ':id',
        component: EditorComponent
    }
];

@NgModule({
    declarations: [ EditorComponent ],
    imports: [
        SharedModule,
        SidebarContentModule,
        NavigationModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        NavigationService,
        DataService,
        SnackBarService,
        //MatDialog,
        ColorService,
        AnimationService,
        AlgorithmsService,
        GraphService,
        OptionsService
    ],
    exports: [
        EditorComponent
    ]
})
export class EditorModule { }