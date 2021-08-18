import { NgModule } from '@angular/core';
import { DeleteConfirmComponent } from './delete-confirm.component';
import { SaveConfirmComponent } from './save-confirm.component';
import { SaveDialogNewComponent } from './save-dialog-new.component';
import { SaveDialogComponent } from './save-dialog.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [
        SaveDialogComponent,
        SaveConfirmComponent,
        DeleteConfirmComponent,
        SaveDialogNewComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SaveDialogComponent,
        SaveConfirmComponent,
        DeleteConfirmComponent,
        SaveDialogNewComponent
    ]
})
export class DialogsModule { }
