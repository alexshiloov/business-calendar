import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';

import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FilterComponent} from './entities/components/filter/filter.component';
import {EditingComponent} from './entities/components/editing/editing.component';
import {HistoryComponent} from './entities/components/history/history.component';
import {ViewComponent} from './entities/components/view/view.component';
import { SnackbarComponent } from './entities/components/snackbar/snackbar.component';
import {MovingComponent} from './entities/components/editing/entities/components/moving/moving.component';
import {ChangingTypeComponent} from './entities/components/editing/entities/components/changing-type/changing-type.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    EditingComponent,
    FilterComponent,
    HistoryComponent,
    ViewComponent,
    MovingComponent,
    ChangingTypeComponent,
    SnackbarComponent
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
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
  ],
  entryComponents: [MovingComponent, ChangingTypeComponent, SnackbarComponent],
  providers: [
    MatSelectModule,
    MatListModule,
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: {color: 'primary'}
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
