import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOfSmartGuysRoutingModule } from './list-of-smart-guys-routing.module';
import { ListOfSmartGuysComponent } from './pages/list-of-smart-guys.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonFormComponent } from './pages/person-form/person-form.component';
import { TableComponent } from './pages/table/table.component';
import { TableRowComponent } from './pages/table/table-row/table-row.component';
import { BaseComponent } from '../shared/components/base/base.component';
import { BrainiacsService } from '../shared/services/brainiacs.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListOfSmartGuysRoutingModule,
    FontAwesomeModule,
    BaseComponent
  ],
  declarations: [
    ListOfSmartGuysComponent,
    PersonFormComponent,
    TableComponent,
    TableRowComponent
  ],
  providers: [
    BrainiacsService
  ]
})
export class ListOfSmartGuysModule { }