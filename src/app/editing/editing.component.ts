import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DayService} from '../service/day.service';
import {FilterService} from '../service/filter.service';
import {Day} from '../classes/day';
import {IdName} from '../classes/id-name';
import {MovingComponent} from '../moving/moving.component';
import {ChangingTypeComponent} from '../changing-type/changing-type.component';

const MOVING_DAY_ID = 1;
const CHANGING_DAY_TYPE_ID = 2;

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {
  constructor( 
  	private dayService: DayService, 
  	private filterService: FilterService,
  	public dialog: MatDialog
  ) { }

  days: Day[];
  selectedAction: any = null;
  selectedMonth: boolean = false;

  actions: IdName[] = [{
  	'id': 1,
  	'name': 'перенести'
  }, {
	'id': 2,
	'name': 'изменить тип дня'  
  }];
  displayedColumns: string[] = ['date', 'weekDay', 'dayType', 'action'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
  	if (this.dayService.days) {
  		this.days = this.dayService.days;
  	} else {
  		this.dayService.daysChange.subscribe((days) => {
        	this.days = days;
    	}); 
    }

    this.selectedMonth = this.filterService.selectedMonth;
  	this.filterService.selectedMonthChange.subscribe((value) => {
        this.selectedMonth = value
    });
  }

  onSelectAction(day, value) {
  	debugger;
  	if (value === MOVING_DAY_ID) {
  		this.dialog.open(MovingComponent, {
  			data: day
	    });
  	}

  	if (value === CHANGING_DAY_TYPE_ID) {
  		this.dialog.open(ChangingTypeComponent, {
  			data: day
  		});
  	}

  	setTimeout(()=> {
      this.selectedAction = null;  
    });
  }

}
