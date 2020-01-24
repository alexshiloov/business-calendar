import {Injectable} from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class DayService {

  private dayUrl = 'http://localhost:80/php/getCalendarInfo.php';  // URL to web api
  private changeDayTypeUrl = 'http://localhost:80/php/changeDateTypeId.php';  //
  //private headers = new HttpHeaders({'Content-Type': 'application/json'});

  days: Day[];
  filter: Filter;
  daysChange: Subject<Day[]> = new Subject<Day[]>();

  constructor(
    private http: HttpClient,
    private filterService: FilterService,
    private historyService: HistoryService
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
        map((response: Response) => response.rows || []),
        tap(_ => this.log('fetched days')),
        catchError(this.handleError<Day[]>('getDays', []))
      );
  }

  loadDays(filter: Filter) {
    this.filter = filter;
    this.getDays(filter).subscribe((days) => {
      this.daysChange.next(days);
    });
  }

  changeDayType(dayTypeId: number, data: DialogData) {
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
        catchError(this.handleError<Day[]>('getDays', []))
      ).subscribe((response) => {
      this.historyService.loadHistory(data.filter);
      days[index].dayTypeId = dayType.id;
      days[index].dayType = dayType.name;
      console.log(data);
    });

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {

  }
}
