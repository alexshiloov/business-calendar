import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewComponent} from './entities/components/view/view.component';
import {EditingComponent} from './entities/components/editing/editing.component';

const routes: Routes = [
    {path: '', redirectTo: '/view', pathMatch: 'full'},
    {path: 'editing', component: EditingComponent},
    {path: 'view', component: ViewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
