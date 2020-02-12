import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Filter} from '../../../../../classes/filter';
import {DayService} from '../../../../../services/day.service';

@Component({
  selector: 'app-default-load',
  templateUrl: './default-load.component.html',
  styleUrls: ['./default-load.component.css']
})
export class DefaultLoadComponent implements OnInit {

  constructor(
  	@Inject(MAT_DIALOG_DATA) public data: Filter,
  	private dayService: DayService,
  ) 
  { 
  }

  ngOnInit() {
  }

  onConfirm() {
    this.dayService.defaultLoad(this.data);
  }

}
