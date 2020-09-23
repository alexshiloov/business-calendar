import {Injectable} from '@angular/core';
import {IdName} from '../../../../../common/entities/classes/id-name';
import {BehaviorSubject, Observable, of, ReplaySubject, throwError} from 'rxjs';
import {HttpRequestService} from '../../../../../common/entities/services/http-request.service';
import {Filter} from '../classes/filter';
import {baseHref} from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    private _yearUrl = baseHref + 'api/api.php?act=Meta&method=getYears';  // URL to web api
    private _countryUrl = baseHref + 'api/api.php?act=Meta&method=getStateCalendarTypes';  // URL to web api
    private _calendarTypeUrl = baseHref + 'api/api.php?act=Meta&method=getCalendarTypes';  // URL to web api
    private _monthUrl = baseHref + 'api/api.php?act=Meta&method=getMonths';  // URL to web api

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

    // tslint:disable-next-line:variable-name
    private _isSelectedMonth$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isSelectedMonth$: Observable<boolean> = this._isSelectedMonth$$.asObservable();

    // tslint:disable-next-line:variable-name
    private _filterFormValidChange$$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    public filterFormValid$: Observable<boolean> = this._filterFormValidChange$$.asObservable();

    public filter: Filter;

    constructor(
        // tslint:disable-next-line:variable-name
        private _httpRequestService: HttpRequestService,
    ) {}

    public getYears(): void {
        this._httpRequestService.getData(this._yearUrl, this._yearChange$$, 'Не удалось получить список годов');
    }

    public getCalendarTypes(): void {
        this._httpRequestService.getData(this._calendarTypeUrl, this._calendarTypeChange$$, 'Не удалось получить список типов календаря');
    }

    public getCountries(): void {
        this._httpRequestService.getData(this._countryUrl, this._countryChange$$, 'Не удалось получить список стран');
    }

    public getMonths(): void {
        this._httpRequestService.getData(this._monthUrl, this._monthChange$$, 'Не удалось получить список месяцев');
    }

    public setMonthIsSelected(value: boolean): void {
        this._isSelectedMonth$$.next(value);
    }

    public setFilterFormIsValid(value: boolean): void {
        this._filterFormValidChange$$.next(value);
    }

    public setFilter(filter: Filter): void {
        this.filter = filter;
    }
}
