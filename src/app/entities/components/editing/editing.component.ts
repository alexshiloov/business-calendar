import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DayService} from './entities/services/day.service';
import {Day} from './entities/classes/day';
import {IdName} from '../../../common/entities/classes/id-name';
import {DialogData} from './entities/classes/dialog-data';
import {MovingComponent} from './entities/components/moving/moving.component';
import {ChangingTypeComponent} from './entities/components/changing-type/changing-type.component';
import {ManageDataService} from '../../../common/entities/services/manage-data.service';
import {FilterService} from '../filter/entities/services/filter.service';

const MOVING_DAY_ID = 1;
const CHANGING_DAY_TYPE_ID = 2;

@Component({
    selector: 'app-editing',
    templateUrl: './editing.component.html',
    styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {
    constructor(
        // tslint:disable-next-line:variable-name
        private _dayService: DayService,
        // tslint:disable-next-line:variable-name
        private _filterService: FilterService,
        public manageDataService: ManageDataService,
        public dialog: MatDialog
    ) {
    }

    public days: Day[];
    public isSelectedMonth: boolean;
    public selectedAction: any = null;
    public dataSource = new MatTableDataSource();

    public actions: IdName[] = [{
        id: 1,
        name: 'перенести'
    }, {
        id: 2,
        name: 'изменить тип дня'
    }];

    displayedColumns: string[] = ['date', 'weekDay', 'dayType', 'action'];

    @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
        this.dataSource.sort = sort;
    }

    ngOnInit() {
        this._dayService.days$.subscribe((days: Day[]) => {
            this.days = days;
            this.dataSource = new MatTableDataSource(this.days);
        });
        this._filterService.isSelectedMonth$.subscribe((value: boolean) => {
            this.isSelectedMonth = value;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onSelectAction(day, value) {
        const dialogData = new DialogData(day, this._filterService.filter);
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
