import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FilterService} from '../../../../filter/entities/services/filter.service';
import {DayService} from '../../services/day.service';
import {IdName} from '../../../../../../common/entities/classes/id-name';
import {DialogData} from '../../classes/dialog-data';
import {Day} from '../../classes/day';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-changing-type',
    templateUrl: './changing-type.component.html',
    styleUrls: ['./changing-type.component.css']
})
export class ChangingTypeComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        // tslint:disable-next-line:variable-name
        private _dialogRef: MatDialogRef<ChangingTypeComponent>,
        // tslint:disable-next-line:variable-name
        private _dayService: DayService
    ) {
    }

    public dayTypes: IdName[];
    public selectedDayTypeId: number;

    ngOnInit() {
        this._dayService.dayTypes$.subscribe((dayTypes: IdName[]) => {
            this.dayTypes = dayTypes;
        });
    }

    onConfirm() {
        this._dayService.changeDayType(this.selectedDayTypeId, this.data);
    }

}
