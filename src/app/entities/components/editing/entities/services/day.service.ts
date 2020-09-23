import {Inject, Injectable} from '@angular/core';
import {Day} from '../classes/day';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Response} from '../../../../../common/entities/classes/response';
import {Filter} from '../../../filter/entities/classes/filter';
import {HistoryService} from '../../../history/entities/services/history.service';
import {FilterService} from '../../../filter/entities/services/filter.service';
import {DialogData} from '../classes/dialog-data';
import {ManageDataService} from '../../../../../common/entities/services/manage-data.service';
import {NotificationService} from '../../../../../common/entities/services/notification.service';
import {HttpRequestService} from '../../../../../common/entities/services/http-request.service';
import {IdName} from '../../../../../common/entities/classes/id-name';
import {baseHref} from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DayService {

    private _dayUrl = baseHref + 'api/api.php?act=Calendar&method=getCalendarDays';  // URL to web api
    private _changeDayTypeUrl =  baseHref + 'api/api.php?act=Calendar&method=changeDateType';  //
    private _transferDayUrl = baseHref + 'api/api.php?act=Calendar&method=transferDateType';
    private _dayTypeUrl = baseHref + 'api/api.php?act=Meta&method=getDayTypes';
    private defaultCalendarUrl = 'http://localhost:80/php/loadCalendar.php';  // URL to web api

    // tslint:disable-next-line:variable-name
    private _daysChange$$: BehaviorSubject<Day[]> = new BehaviorSubject<Day[]>([]);
    public days$: Observable<Day[]> = this._daysChange$$.asObservable();

    // tslint:disable-next-line:variable-name
    private _dayTypeChange$$: BehaviorSubject<IdName[]> = new BehaviorSubject<IdName[]>([]);
    public dayTypes$: Observable<IdName[]> = this._dayTypeChange$$.asObservable();

    constructor(
        // tslint:disable-next-line:variable-name
        private _httpRequestService: HttpRequestService,
        // tslint:disable-next-line:variable-name
        private _historyService: HistoryService,
        // tslint:disable-next-line:variable-name
        private _manageDataService: ManageDataService,
        // tslint:disable-next-line:variable-name
        private _notificationService: NotificationService
    ) {
        this._httpRequestService.getData(this._dayTypeUrl, this._dayTypeChange$$, 'Не удалось загрузить информацию по типам дней');
    }

    /** Загрузка списка дней по фильтру */
    loadDays(filter: Filter) {
        // tslint:disable-next-line:max-line-length
        const url = this._dayUrl + '&month=' + filter.month + '&stateId=' + filter.countryId + '&year=' + filter.yearId + '&weekTypeId=' + filter.calendarTypeId;
        this._httpRequestService.getData(url, this._daysChange$$, 'Не удалось загрузить информацию по дням');
    }

    /**
     * Изменение типа дня
     * @param dayTypeId: number
     * @param data: DialogData
     */
    changeDayType(dayTypeId: number, data: DialogData) {
        const days = this._daysChange$$.getValue();
        const index = days.findIndex(day => day.id === data.day.id);
        const dayType = this._dayTypeChange$$.getValue().find(item => item.id === dayTypeId);

        const json = JSON.stringify({
            dayDate: days[index].date,
            newDayTypeId: dayTypeId,
            weekTypeId: data.filter.calendarTypeId,
            stateId: data.filter.countryId,
        });
        this._httpRequestService.saveData(this._changeDayTypeUrl, json, 'Не получилось изменить тип дня')
            .subscribe((response: Response) => {
                this._manageDataService.indicateLoadStatus('end');
                if (!response.success) {
                    this._notificationService.show('Не получилось изменить тип дня');
                    return;
                }
                this._historyService.loadHistory(data.filter);
                days[index].dayType = dayType;
            });
    }

    /**
     * перенос дня
     * @param selectedDate: string
     * @param data: DialogData
     */
    moveDay(selectedDate: string, data: DialogData) {
        const days = this._daysChange$$.getValue();
        const index = days.findIndex(day => day.id === data.day.id);
        const oldDate = days[index].date;
        const json = JSON.stringify({
            newDayDate: selectedDate,
            oldDayDate: oldDate,
            weekTypeId: data.filter.calendarTypeId,
            stateId: data.filter.countryId,
        });

        this._httpRequestService.saveData(this._transferDayUrl, json, 'Не получилось перенести день')
            .subscribe((response: Response) => {
                this._manageDataService.indicateLoadStatus('end');
                if (!response.success) {
                    this._notificationService.show('Не получилось перенести день');
                    return;
                }
                this._historyService.loadHistory(data.filter);
                this.loadDays(data.filter);
            });
    }


    defaultLoad(filter: Filter) {
        // this.manageDataService.indicateLoadStatus('start');
        //
        // this.http.post(
        //     this.defaultCalendarUrl,
        //     JSON.stringify({
        //         calendarTypeId: filter.calendarTypeId,
        //         year: filter.yearId,
        //         countryId: filter.countryId,
        //         loadAcceptFlag: 1
        //     })
        // ).pipe(
        //     catchError(this.handleError<any[]>('Загрузка по умолчанию не удалась'))
        // ).subscribe((response: Response) => {
        //     this.manageDataService.indicateLoadStatus('end');
        //     if (!response.success) {
        //         this._notificationService.show('Загрузка по умолчанию не удалась');
        //         return;
        //     }
        //     this.historyService.loadHistory(filter);
        //     if (filter.month) {
        //       //  this.loadDays(filter);
        //     }
        // });
    }
}
