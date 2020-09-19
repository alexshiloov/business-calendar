import { Component } from '@angular/core';
import {FilterService} from '../filter/entities/services/filter.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  constructor(private filterService: FilterService) { }
}
