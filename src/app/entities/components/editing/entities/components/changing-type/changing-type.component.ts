import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FilterService} from '../../../../filter/entities/services/filter.service';
import {DayService} from '../../services/day.service';
import {IdName} from '../../../../../../common/entities/classes/id-name';
import {DialogData} from '../../../../../classes/dialog-data';

@Component({
  selector: 'app-changing-type',
  templateUrl: './changing-type.component.html',
  styleUrls: ['./changing-type.component.css']
})
export class ChangingTypeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private filterService: FilterService,
    private dialogRef: MatDialogRef<ChangingTypeComponent>,
    private dayService: DayService
  ) {
  }

  dayTypes: IdName[];
  dayTypeId: number = 0;

  ngOnInit() {
    // this.filterService.getDayTypes().subscribe((types) => {
    //   this.dayTypes = types;
    // });
  }

  onConfirm() {
    this.dayService.changeDayType(this.dayTypeId, this.data);
  }

}
