import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmComponent } from './delete-confirm.component';
import { SaveConfirmComponent } from './save-confirm.component';
import { SaveDialogNewComponent } from './save-dialog-new.component';
import { SaveDialogComponent } from './save-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SaveDialogComponent,
    SaveConfirmComponent,
    DeleteConfirmComponent,
    SaveDialogNewComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    SaveDialogComponent,
    SaveConfirmComponent,
    DeleteConfirmComponent,
    SaveDialogNewComponent
  ]
})
export class DialogsModule { }
