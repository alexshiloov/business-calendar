import { Component, OnInit } from '@angular/core';
import {HistoryService} from '../service/history.service';
import {FilterService} from '../service/filter.service';
import {History} from '../classes/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  loading: boolean = false;
  constructor(
  	private historyService: HistoryService,
  	private filterService: FilterService
  ) {
  	this.historyService.loadingChange.subscribe((value) => {
    	this.loading = value;
    }); 
  }

  historyDays: History[];
  displayedColumns: string[] = ['updateDate', 'row'];
  ngOnInit() {
  	this.historyService.historyChange.subscribe((days) => {
    	this.historyDays = days
	}); 
  }

}
