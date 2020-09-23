import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {DialogData} from '../../classes/dialog-data';
import {DayService} from '../../services/day.service';

@Component({
    selector: 'app-moving',
    templateUrl: './moving.component.html',
    styleUrls: ['./moving.component.css']
})
export class MovingComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _dayService: DayService,
        private _dateAdapter: DateAdapter<any>) {
    }

    public selectedDate: string | null = null;

    ngOnInit() {
        this._dateAdapter.setLocale('ru-RU');
    }

    onConfirm() {
        this._dayService.moveDay(this.selectedDate, this.data);
    }

}
