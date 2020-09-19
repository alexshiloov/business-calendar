import {Injectable} from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
import {Response} from '../../../../../common/entities/classes/response';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Filter} from '../../../filter/entities/classes/filter';
import {History} from '../classes/history';
import {ManageDataService} from '../../../../../common/entities/services/manage-data.service';
import {NotificationService} from '../../../../../common/entities/services/notification.service';
import {HttpRequestService} from '../../../../../common/entities/services/http-request.service';
import {IdName} from '../../../../../common/entities/classes/id-name';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {

    constructor(
        // tslint:disable-next-line:variable-name
        private _httpRequestService: HttpRequestService,
    ) {}

    // tslint:disable-next-line:variable-name
    private _historyChange$$: BehaviorSubject<History[]> = new BehaviorSubject<History[]>([]);
    public history$: Observable<History[]> = this._historyChange$$.asObservable();

    // tslint:disable-next-line:variable-name
    private _filterFormValidChange$$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    public filterFormValid$: Observable<boolean> = this._filterFormValidChange$$.asObservable();

    private historyUrl = 'http://10.100.200.31/business-calendar/api/api.php?act=History&method=getHistory';  //
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    /** GET heroes from the server */
    loadHistory(filter: Filter): void {
        // tslint:disable-next-line:max-line-length
        const url = this.historyUrl + '&stateId=' + filter.countryId + '&year=' + filter.yearId + '&weekTypeId=' + filter.calendarTypeId;
        this._httpRequestService.getData(url, this._historyChange$$, 'Не удалось загрузить историю');
    }

    setFilterFormIsValid(value: boolean): void {
        this._filterFormValidChange$$.next(value);
    }
}
