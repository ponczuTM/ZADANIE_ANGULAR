import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfSmartGuysComponent } from './pages/list-of-smart-guys.component';

const routes: Routes = [
  { path: '', component: ListOfSmartGuysComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListOfSmartGuysRoutingModule { }