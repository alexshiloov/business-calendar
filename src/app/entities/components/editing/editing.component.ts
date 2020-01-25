import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DayService} from '../../services/day.service';
import {FilterService} from '../../services/filter.service';
import {Day} from '../../classes/day';
import {IdName} from '../../classes/id-name';
import {DialogData} from '../../classes/dialog-data';
import {MovingComponent} from './entities/components/moving/moving.component';
import {ChangingTypeComponent} from './entities/components/changing-type/changing-type.component';
import {ManageDataService} from '../../../common/entities/services/manage-data.service';

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
    public filterService: FilterService,
    public manageDataService: ManageDataService,
    public dialog: MatDialog
  ) {
  }

  days: Day[];
  selectedAction: any = null;
  dataSource = new MatTableDataSource();

  actions: IdName[] = [{
    'id': 1,
    'name': 'перенести'
  }, {
    'id': 2,
    'name': 'изменить тип дня'
  }];

  displayedColumns: string[] = ['date', 'weekDay', 'dayType', 'action'];

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngOnInit() {
    if (this.dayService.days) {
      this.days = this.dayService.days;
      this.dataSource = new MatTableDataSource(this.days);
    }
    this.dayService.daysChange.subscribe((days) => {
      this.days = days;
      this.dataSource = new MatTableDataSource(this.days);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectAction(day, value) {
    let dialogData = new DialogData(day, this.dayService.filter);
    if (value === MOVING_DAY_ID) {
      this.dialog.open(MovingComponent, {
        disableClose: true,
        data: dialogData
      });
    }

    if (value === CHANGING_DAY_TYPE_ID) {
      this.dialog.open(ChangingTypeComponent, {
        disableClose: true,
        data: dialogData
      });
    }

    setTimeout(() => {
      this.selectedAction = null;
    });
  }

}
