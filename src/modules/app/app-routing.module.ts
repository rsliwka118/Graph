import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'editor',
        loadChildren: () => import('../editor/editor.module').then(m => m.EditorModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        // {
        //     preloadingStrategy: PreloadAllModules
        // }
    )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
