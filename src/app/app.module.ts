import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { EditingComponent } from './editing/editing.component';
import { HistoryComponent } from './history/history.component';
import { ViewComponent } from './view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { MovingComponent } from './moving/moving.component';
import { ChangingTypeComponent } from './changing-type/changing-type.component';


@NgModule({
  declarations: [
    AppComponent,
    EditingComponent,
    FilterComponent,
    HistoryComponent,
    ViewComponent,
    MovingComponent,
    ChangingTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatRadioModule,
    HttpClientModule,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
  ],
  entryComponents: [MovingComponent, ChangingTypeComponent],
  providers: [
    MatSelectModule, 
    MatListModule, 
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
