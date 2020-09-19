import {Component, OnInit} from '@angular/core';
import {FilterService} from './entities/services/filter.service';
import {DayService} from '../editing/entities/services/day.service';
import {HistoryService} from '../history/entities/services/history.service';
import {IdName} from '../../../common/entities/classes/id-name';
import {Filter} from './entities/classes/filter';
import {ManageDataService} from '../../../common/entities/services/manage-data.service';
import {MatDialog} from '@angular/material/dialog';
import {DefaultLoadComponent} from './entities/components/default-load/default-load.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {interval} from 'rxjs';
import {timeout} from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

    public countries: IdName[];
    public calendarTypes: IdName[];
    public years: IdName[];
    public months: IdName[];
    selectedMonth: string;

    constructor(
        public dialog: MatDialog,
        // tslint:disable-next-line:variable-name
        private _filterService: FilterService,
        private dayService: DayService,
        private _historyService: HistoryService
    ) {
    }

    public filterForm: FormGroup = new FormGroup({
        year: new FormControl(null, [Validators.required]),
        weekType: new FormControl(null, [Validators.required]),
        country: new FormControl(null, [Validators.required])
    });

    ngOnInit() {
        this._filterService.years$.subscribe((years: IdName[]) => {
            this.years = years;
        });
        this._filterService.getYears();

        this._filterService.calendarTypes$.subscribe((calendarTypes: IdName[]) => {
            this.calendarTypes = calendarTypes;
        });
        this._filterService.getCalendarTypes();

        this._filterService.countries$.subscribe((countries: IdName[]) => {
            this.countries = countries;
        });
        this._filterService.getCountries();

        this._filterService.months$.subscribe((months: IdName[]) => {
            this.months = months;
        });
        this._filterService.getMonths();
    }

    // tslint:disable-next-line:typedef
    get year() { return this.filterForm.get('year'); }
    // tslint:disable-next-line:typedef
    get country() { return this.filterForm.get('country'); }
    // tslint:disable-next-line:typedef
    get weekType() { return this.filterForm.get('weekType'); }

    get filterFormIsValid() { return this.filterForm.valid; }

    onChangeMonth(item) {
        // this.filterService.indicateSelectedMonth(true);
        // let filter = new Filter(this.selectedCountry, this.selectedWeekType, this.selectedYear, item.id);
        // this.dayService.loadDays(filter);
    }

    onChangeCombo() {
        if (this.filterForm.valid) {
            // @ts-ignore
            const filter = new Filter(this.country.value, this.weekType.value, this.year.value);
            this._historyService.loadHistory(filter);
        }
        this._historyService.setFilterFormIsValid(this.filterForm.valid);
    }

    onDefaultLoad() {
        // let filter = new Filter(this.selectedCountry, this.selectedWeekType, this.selectedYear, parseInt(this.selectedMonth));
        // this.dialog.open(DefaultLoadComponent, {
        //     disableClose: true,
        //     data: filter
        // });
    }

}
