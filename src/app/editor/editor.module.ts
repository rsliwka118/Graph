import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { NavigationModule } from '../navigation/navigation.module';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CoreModule } from '../core/core.module';

@NgModule({
    declarations: [ EditorComponent ],
    imports: [
        CommonModule,
        CoreModule,
        NavigationModule,
        MatListModule,
        MatSidenavModule
    ],
    exports: [
        EditorComponent
    ]
})
export class EditorModule { }
