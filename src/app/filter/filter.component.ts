import { Component, OnInit } from '@angular/core';
import {FilterService} from '../service/filter.service';
import {DayService} from '../service/day.service';
import {HistoryService} from '../service/history.service';
import {IdName} from '../classes/id-name';
import {Filter} from '../classes/filter';
import {Observable, of} from 'rxjs';

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
  edited: boolean = false;
  loading: boolean = false;

  constructor(
    public filterService: FilterService,
    private dayService: DayService,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.filterService.getCountries().subscribe (countries => {
      this.countries = countries
    });
    this.filterService.getCalendarTypes().subscribe(calendarTypes => {
      this.calendarTypes = calendarTypes;
    });
    this.filterService.getYears().subscribe(years => {
      this.years = years
    });
   
    this.filterService.getMonths().subscribe(months => {
      this.months = months;
      this.loading = false;
    });
  }

  onChangeMonth(item) {
    this.filterService.selectedMonthChange.next(true);
    let filter = new Filter(this.selectedCountry, this.selectedWeekType, this.selectedYear, item.id);
    this.dayService.loadDays(filter);
  }

  onChangeCombo(item) {
    let selected = false;
    
    this.selectedMonth = null;
    this.filterService.selectedMonthChange.next(false);
    if (this.selectedCountry && this.selectedWeekType && this.selectedYear) {
      let filter = new Filter(this.selectedCountry, this.selectedWeekType, this.selectedYear);
      this.historyService.loadHistory(filter);
      selected = true;
    }

    this.filterService.selectedCombosChange.next(selected);
  }

}
