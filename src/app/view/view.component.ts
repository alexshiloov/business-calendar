import { Component, OnInit } from '@angular/core';
import {FilterService} from '../service/filter.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private filterService: FilterService) { }
  public selectedCombos: boolean;

  ngOnInit() {
  	this.selectedCombos = this.filterService.selectedCombos;
  	this.filterService.selectedCombosChange.subscribe((value) => {
        this.selectedCombos = value
    });

  }

}
