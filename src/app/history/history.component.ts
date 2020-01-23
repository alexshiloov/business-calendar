import { Component, OnInit, ViewChild } from '@angular/core';
import {HistoryService} from '../service/history.service';
import {FilterService} from '../service/filter.service';
import {History} from '../classes/history';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

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

  //historyDays: History[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['updateDate', 'row'];

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
	  this.dataSource.sort = sort;
  }
  ngOnInit() {
  	this.historyService.historyChange.subscribe((days) => {
    	this.dataSource = new MatTableDataSource(days);
	}); 
  }

}
