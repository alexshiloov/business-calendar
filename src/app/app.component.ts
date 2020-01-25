import {Component} from '@angular/core';
import {ManageDataService} from './common/entities/services/manage-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(public manageDataService: ManageDataService) {
  }

  title = 'business-calendar';
}
