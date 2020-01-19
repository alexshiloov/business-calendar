import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-moving',
  templateUrl: './moving.component.html',
  styleUrls: ['./moving.component.css']
})
export class MovingComponent implements OnInit {

  constructor(
  	@Inject(MAT_DIALOG_DATA) public data, 
  	private dateAdapter: DateAdapter<any>) {}

  selectedDate: string;
  ngOnInit() {
  	 this.dateAdapter.setLocale('ru-RU');
  }

  onConfirm() {
  	debugger;
  }

}
