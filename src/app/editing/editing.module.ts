import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditingComponent } from './editing.component';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditingComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class EditingModule { }
