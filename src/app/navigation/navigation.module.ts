import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesBottomSheetComponent } from './files-bottom-sheet.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SnackBarComponent } from './snack-bar.component';
import { FormsModule } from '@angular/forms';
import { DialogsModule } from './dialogs/dialogs.module';
import { PanelsModule } from './panels/panels.module';
import { SidebarContentModule } from './sidebar/sidebar-content/sidebar-content.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        FilesBottomSheetComponent,
        SnackBarComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatTooltipModule

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
