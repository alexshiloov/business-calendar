import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FilterService} from '../service/filter.service';
import {IdName} from '../classes/id-name';

@Component({
  selector: 'app-changing-type',
  templateUrl: './changing-type.component.html',
  styleUrls: ['./changing-type.component.css']
})
export class ChangingTypeComponent implements OnInit {

  constructor(
  	@Inject(MAT_DIALOG_DATA) public data,
  	private filterService: FilterService
  ) {
  	
  }

  dayTypes: IdName[];
  dayTypeId: number;

  ngOnInit() {
  	this.filterService.getDayTypes().subscribe((types) => {
        this.dayTypes = types
    }); 
  }

  onConfirm() {
  	debugger;
  }

}
