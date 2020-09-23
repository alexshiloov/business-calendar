import {Component, OnInit, ViewChild} from '@angular/core';
import {HistoryService} from './entities/services/history.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {History} from './entities/classes/history';
import {ManageDataService} from '../../../common/entities/services/manage-data.service';
import {FilterService} from '../filter/entities/services/filter.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    constructor(
        // tslint:disable-next-line:variable-name
        private _historyService: HistoryService,
        // tslint:disable-next-line:variable-name
        private _filterService: FilterService,
        // tslint:disable-next-line:variable-name
        private _manageDataService: ManageDataService
    ) {}

    public loadCounter = 0;
    public isFilterFormValid = false;
    dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['updateDate', 'row'];

    @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
        this.dataSource.sort = sort;
    }

    ngOnInit() {
        this._historyService.history$.subscribe((historyDays: History[]) => {
            this.dataSource = new MatTableDataSource(historyDays);
        });

        this._filterService.filterFormValid$.subscribe((value: boolean) => {
            this.isFilterFormValid = value;
        });

        this._manageDataService.loadStatus$.subscribe((value: number) => {
            this.loadCounter = value;
        });
    }

}
