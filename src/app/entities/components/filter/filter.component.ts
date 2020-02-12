import {Component, OnInit} from '@angular/core';
import {FilterService} from '../../services/filter.service';
import {DayService} from '../../services/day.service';
import {HistoryService} from '../../services/history.service';
import {IdName} from '../../classes/id-name';
import {Filter} from '../../classes/filter';
import {ManageDataService} from '../../../common/entities/services/manage-data.service';
import {MatDialog} from '@angular/material/dialog';
import {DefaultLoadComponent} from './entities/components/default-load/default-load.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  countries: IdName[];
  calendarTypes: IdName[];
  years: IdName[];
  months: IdName[];
  selectedCountry: string;
  selectedWeekType: number;
  selectedYear: number;
  selectedMonth: string;

  constructor(
    public dialog: MatDialog,
    public filterService: FilterService,
    public manageDataService: ManageDataService,
    private dayService: DayService,
    private historyService: HistoryService
  ) {
  }

  ngOnInit() {
    this.manageDataService.indicateLoadStatus('start');
    this.filterService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.filterService.getCalendarTypes().subscribe(calendarTypes => {
      this.calendarTypes = calendarTypes;
    });
    this.filterService.getYears().subscribe(years => {
      this.years = years;
    });

    this.filterService.getMonths().subscribe(months => {
      this.months = months;
      this.manageDataService.indicateLoadStatus('end');
    });
  }

  onChangeMonth(item) {
    this.filterService.indicateSelectedMonth(true);
    let filter = new Filter(this.selectedCountry, this.selectedWeekType, this.selectedYear, item.id);
    this.dayService.loadDays(filter);
  }

  onChangeCombo(item) {
    let selected = false;

    this.selectedMonth = null;
    this.filterService.indicateSelectedMonth(false);
    if (this.selectedCountry && this.selectedWeekType && this.selectedYear) {
      let filter = new Filter(this.selectedCountry, this.selectedWeekType, this.selectedYear);
      this.historyService.loadHistory(filter);
      selected = true;
    }

    this.filterService.indicateSelectedCombos(selected);
  }

  onDefaultLoad() {
    let filter = new Filter(this.selectedCountry, this.selectedWeekType, this.selectedYear, parseInt(this.selectedMonth));
    this.dialog.open(DefaultLoadComponent, {
        disableClose: true,
        data: filter
    });
  }

}
