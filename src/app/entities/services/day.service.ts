import {Inject, Injectable} from '@angular/core';
import {Day} from '../classes/day';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Response} from '../classes/response';
import {Filter} from '../classes/filter';
import {HistoryService} from './history.service';
import {FilterService} from './filter.service';
import {DialogData} from '../classes/dialog-data';
import {ManageDataService} from '../../common/entities/services/manage-data.service';
import {NotificationService} from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class DayService {

  private dayUrl = 'http://localhost:80/php/getCalendarInfo.php';  // URL to web api
  private changeDayTypeUrl = 'http://localhost:80/php/changeDateTypeId.php';  //
  private transferDayUrl = 'http://localhost:80/php/transferDateTypeId.php';
  private defaultCalendarUrl = 'http://localhost:80/php/loadCalendar.php';  // URL to web api
  //private headers = new HttpHeaders({'Content-Type': 'application/json'});

  days: Day[];
  filter: Filter;
  daysChange: Subject<Day[]> = new Subject<Day[]>();

  constructor(
    private http: HttpClient,
    private filterService: FilterService,
    private historyService: HistoryService,
    private manageDataService: ManageDataService,
    private _notificationService: NotificationService
  ) {
    this.daysChange.subscribe((days) => {
      this.days = days;
    });
  }

  /** GET heroes from the server */
  getDays(filter: Filter): Observable<Day[]> {
    let url = this.dayUrl + '?month=' + filter.month + '&countryId=' + filter.countryId + '&yearId=' + filter.yearId + '&calendarTypeId=' + filter.calendarTypeId;
    return this.http.get(url)
      .pipe(
        map((response: Response) => {
          if (!response.success) {
            throw new Error();
          }
          return response.rows || [];
        }),
        catchError(this.handleError<any[]>('Не удалось загрузить информацию по дням', []))
      );
  }

  loadDays(filter: Filter) {
    this.manageDataService.indicateLoadStatus('start');
    this.filter = filter;
    this.getDays(filter).subscribe((days) => {
      this.daysChange.next(days);
      this.manageDataService.indicateLoadStatus('end');
    });
  }

  changeDayType(dayTypeId: number, data: DialogData) {
    this.manageDataService.indicateLoadStatus('start');
    let days = this.days;
    let index = days.findIndex(day => day.id === data.day.id);
    let oldDayTypeId = days[index].dayTypeId;
    let dayType = this.filterService.dayTypes.find(dayType => dayType.id === dayTypeId);

    this.http.post(this.changeDayTypeUrl,
      JSON.stringify({
        dayDate: days[index].date,
        oldDayTypeId: oldDayTypeId,
        newDayTypeId: dayTypeId,
        calendarTypeId: data.filter.calendarTypeId,
      }))
      .pipe(
        catchError(this.handleError<Day[]>('Не получилось изменить тип дня', []))
      ).subscribe((response: Response) => {
        this.manageDataService.indicateLoadStatus('end');
        if (!response.success) {
          this._notificationService.show('Не получилось изменить тип дня');
          return;
        }
        this.historyService.loadHistory(data.filter);
        days[index].dayTypeId = dayType.id;
        days[index].dayType = dayType.name;
      });

  }

  moveDay(selectedDate: string, data: DialogData) {
    this.manageDataService.indicateLoadStatus('start');
    let days = this.days;
    let index = days.findIndex(day => day.id === data.day.id);
    let oldDate = days[index].date;
    let dayTypeId = days[index].dayTypeId;

    this.http.post(this.transferDayUrl,
      JSON.stringify({
        newDayDate: days[index].date,
        oldDayDate: oldDate,
        oldDayTypeId: dayTypeId,
        calendarTypeId: data.filter.calendarTypeId,
      }))
      .pipe(
        catchError(this.handleError<Day[]>('Не получилось перенести день', []))
      ).subscribe((response: Response) => {
          this.manageDataService.indicateLoadStatus('end');
          if (!response.success) {
            this._notificationService.show('Не получилось перенести день');
            return;
          }
          this.historyService.loadHistory(data.filter);
          this.loadDays(data.filter);
    });
  }


   defaultLoad(filter: Filter) {
      this.manageDataService.indicateLoadStatus('start');

      this.http.post(
          this.defaultCalendarUrl,
          JSON.stringify({
              calendarTypeId: filter.calendarTypeId,
              year: filter.yearId,
              countryId: filter.countryId,
              loadAcceptFlag: 1
          })
      ).pipe(
          catchError(this.handleError<any[]>('Загрузка по умолчанию не удалась'))
      ).subscribe((response: Response) => {
          this.manageDataService.indicateLoadStatus('end');
          if (!response.success) {
              this._notificationService.show('Загрузка по умолчанию не удалась');
              return;
          }
          this.historyService.loadHistory(filter);
          if (filter.month) {
              this.loadDays(filter);
          }
      });
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param msg
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(msg: string, result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this._notificationService.show(msg);
      this.manageDataService.indicateLoadStatus('end');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
