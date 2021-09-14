import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatListModule,
        MatButtonModule,
        FormsModule,
        MatTooltipModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatDialogModule,
        MatMenuModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatTabsModule,
        MatGridListModule
    ],
    exports: [
        CommonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatListModule,
        MatButtonModule,
        FormsModule,
        MatTooltipModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatDialogModule,
        MatMenuModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatTabsModule,
        MatGridListModule
    ]
})
export class SharedModule { }
