import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HomeComponent } from './components/home/home.component';
import { DemoMaterialModule } from './material-module';
import {GraphService} from './services/graph.service';
import { FilesBottomSheetComponent } from './components/mat-components/files-bottom-sheet/files-bottom-sheet.component';
import { SaveDialogComponent } from './components/mat-components/dialogs/save-dialog/save-dialog.component'
import { MatInputModule } from '@angular/material/input';
import { SaveConfirmComponent } from './components/mat-components/dialogs/save-confirm/save-confirm.component';
import { DeleteConfirmComponent } from './components/mat-components/dialogs/delete-confirm/delete-confirm.component';
import { SaveDialogNewComponent } from './components/mat-components/dialogs/save-dialog-new/save-dialog-new.component';
import { SnackBarComponent } from './components/mat-components/snack-bar/snack-bar.component';
import { AdjacencyMatrixComponent } from './components/adjacency-matrix/adjacency-matrix.component';
import { IncidenceMatrixComponent } from './components/incidence-matrix/incidence-matrix.component';
import { AdjacencyListComponent } from './components/adjacency-list/adjacency-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilesBottomSheetComponent,
    SaveDialogComponent,
    SaveConfirmComponent,
    DeleteConfirmComponent,
    SaveDialogNewComponent,
    SnackBarComponent,
    AdjacencyMatrixComponent,
    IncidenceMatrixComponent,
    AdjacencyListComponent
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
