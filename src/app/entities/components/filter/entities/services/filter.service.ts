import {Injectable} from '@angular/core';
import {IdName} from '../../../../../common/entities/classes/id-name';
import {BehaviorSubject, Observable, of, ReplaySubject, throwError} from 'rxjs';
import {HttpRequestService} from '../../../../../common/entities/services/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    private yearUrl = 'http://10.100.200.31/business-calendar/api/api.php?act=Meta&method=getYears';  // URL to web api
    private countryUrl = 'http://10.100.200.31/business-calendar/api/api.php?act=Meta&method=getStateCalendarTypes';  // URL to web api
    private calendarTypeUrl = 'http://10.100.200.31/business-calendar/api/api.php?act=Meta&method=getCalendarTypes';  // URL to web api
    private monthUrl = 'http://10.100.200.31/business-calendar/api/api.php?act=Meta&method=getMonths';  // URL to web api
    private dayTypeUrl = 'http://localhost:80/php/getWeekType.php';  // URL to web api
    private defaultCalendarUrl = 'http://localhost:80/php/loadCalendar.php';  // URL to web api

    // tslint:disable-next-line:variable-name
    private _yearChange$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>([]);
    public years$: Observable<IdName[]> = this._yearChange$$.asObservable();

    // tslint:disable-next-line:variable-name
    private _calendarTypeChange$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>([]);
    public calendarTypes$: Observable<IdName[]> = this._calendarTypeChange$$.asObservable();

    // tslint:disable-next-line:variable-name
    private _countryChange$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>([]);
    public countries$: Observable<IdName[]> = this._countryChange$$.asObservable();

    // tslint:disable-next-line:variable-name
    private _monthChange$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>([]);
    public months$: Observable<IdName[]> = this._monthChange$$.asObservable();

    public dayTypes: IdName[];

    constructor(
        // tslint:disable-next-line:variable-name
        private _httpRequestService: HttpRequestService,
    ) {}

    getYears(): void {
        this._httpRequestService.getData(this.yearUrl, this._yearChange$$, 'Не удалось получить список годов');
    }

    getCalendarTypes(): void {
        this._httpRequestService.getData(this.calendarTypeUrl, this._calendarTypeChange$$, 'Не удалось получить список типов календаря');
    }

    getCountries(): void {
        this._httpRequestService.getData(this.countryUrl, this._countryChange$$, 'Не удалось получить список стран');
    }

    getMonths(): void {
        this._httpRequestService.getData(this.monthUrl, this._monthChange$$, 'Не удалось получить список месяцев');
    }
}
