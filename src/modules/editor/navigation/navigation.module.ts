import { NgModule } from '@angular/core';
import { FilesBottomSheetComponent } from './files-bottom-sheet/files-bottom-sheet.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SnackBarComponent } from './snack-bar.component';
import { DialogsModule } from './dialogs/dialogs.module';
import { PanelsModule } from './panels/panels.module';
import { SharedModule } from '../../shared/shared.module';
import { MatModule } from 'src/modules/mat/mat.module';

@NgModule({
    declarations: [
        FilesBottomSheetComponent,
        SnackBarComponent,
        SidebarComponent
    ],
    imports: [
        SharedModule,
        MatModule
    ],
    exports: [
        FilesBottomSheetComponent,
        SnackBarComponent,
        SidebarComponent,
        DialogsModule,
        PanelsModule,
    //SidebarContentModule
    ]
})
export class NavigationModule { }
