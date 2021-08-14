import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { NavigationModule } from '../navigation/navigation.module';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [ EditorComponent ],
  imports: [
    CommonModule,
    NavigationModule,
    MatListModule,
    MatSidenavModule
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule { }
