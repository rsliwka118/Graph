import { NgModule } from '@angular/core';
import { DeleteConfirmComponent } from './delete-confirm.component';
import { SaveConfirmComponent } from './save-confirm.component';
import { SaveDialogComponent } from './save-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { EditDialogComponent } from './edit-dialog.component';
import { RepresentationAlertComponent } from './representation-alert';

@NgModule({
    declarations: [
        SaveDialogComponent,
        SaveConfirmComponent,
        DeleteConfirmComponent,
        EditDialogComponent,
        RepresentationAlertComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SaveDialogComponent,
        SaveConfirmComponent,
        DeleteConfirmComponent,
        EditDialogComponent,
        RepresentationAlertComponent
    ]
})
export class DialogsModule { }
