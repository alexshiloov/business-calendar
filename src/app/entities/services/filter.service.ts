import {Injectable} from '@angular/core';
import {IdName} from '../classes/id-name';
import {Filter} from '../classes/filter';
import {Response} from '../classes/response';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, ReplaySubject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private yearUrl = 'http://localhost:80/php/getYear.php';  // URL to web api
  private countryUrl = 'http://localhost:80/php/getCountryId.php';  // URL to web api
  private calendarTypeUrl = 'http://localhost:80/php/getCalendarType.php';  // URL to web api
  private monthUrl = 'http://localhost:80/php/getMonth.php';  // URL to web api
  private dayTypeUrl = 'http://localhost:80/php/getWeekType.php';  // URL to web api
  private defaultCalendarUrl = 'http://localhost:80/php/loadCalendar.php';  // URL to web api

  public dayTypes: IdName[];
  private _hasSelectedMonth$$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _hasSelectedCombos$$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private http: HttpClient, 
    private _notificationService: NotificationService
  )
  {
      this._hasSelectedCombos$$.next(false);
      this._hasSelectedMonth$$.next(false);

      this.getDayTypes().subscribe((types) => {
        this.dayTypes = types;
      });
  }

  /**
   * Подписка на выбран ли месяц или нет
   */
  public get hasSelectedMonth$(): Observable<boolean> {
    return this._hasSelectedMonth$$.asObservable();
  }

  public indicateSelectedMonth(value: boolean): void {
    this._hasSelectedMonth$$.next(value);
  }

  /**
   * Подписка на выбраны ли элементы из select в filter.component
   */
  public get hasSelectedCombos$(): Observable<boolean> {
    return this._hasSelectedCombos$$.asObservable();
  }

  public indicateSelectedCombos(value: boolean): void {
    this._hasSelectedCombos$$.next(value);
  }

  getDayTypes(): Observable<IdName[]> {
    return this.http.get(this.dayTypeUrl)
      .pipe(
        map((response: Response) => {
          if (!response.success) {
            throw new Error();
          }
          return response.rows || [];
        }),
        catchError(this.handleError<any[]>('Не удалось загрузить типы недель', []))
      );
  }

  getCalendarTypes(): Observable<IdName[]> {
    return this.http.get(this.calendarTypeUrl)
      .pipe(
        map((response: Response) => {
          if (!response.success) {
            throw new Error();
          }
          return response.rows || [];
        }),
        catchError(this.handleError<any[]>('Не удалось получить типы календаря', []))
      );
  }


  /** GET heroes from the server */
  getYears(): Observable<IdName[]> {
    return this.http.get(this.yearUrl)
      .pipe(
        map((response: Response) => {
          if (!response.success) {
            throw new Error();
          }
          return response.rows || [];
        }),
        catchError(this.handleError<any[]>('Не удалось загрузить список годов', []))
      );
  }

  getCountries(): Observable<IdName[]> {
    return this.http.get(this.countryUrl)
      .pipe(
        map((response: Response) => {
          if (!response.success) {
            throw new Error();
          }
          return response.rows || [];
        }),
        catchError(this.handleError<any[]>('Не удалось загрузить список стран', []))
      );
  }

  getMonths(): Observable<IdName[]> {
    return this.http.get(this.monthUrl)
      .pipe(
        map((response: Response) => {
          if (!response.success) {
            throw new Error();
          }
          return response.rows || [];
        }),
        catchError(this.handleError<any[]>('Не удалось загрузить список месяцев', []))
      );
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

      this._notificationService.show(msg);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
