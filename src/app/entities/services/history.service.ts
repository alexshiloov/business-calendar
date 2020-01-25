import {Injectable} from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Response} from '../classes/response';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Filter} from '../classes/filter';
import {History} from '../classes/history';
import {ManageDataService} from '../../common/entities/services/manage-data.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient,
    private manageDataService: ManageDataService
  ) {
    this.historyChange.subscribe((days) => {
      this.historyDays = days;
    });
  }

  private historyUrl = 'http://localhost:80/php/getHistory.php';  //
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  historyDays: History[];
  loadingChange: Subject<boolean> = new Subject<boolean>();
  historyChange: Subject<History[]> = new Subject<History[]>();

  /** GET heroes from the server */
  getHistory(filter: Filter): Observable<History[]> {

    let url = this.historyUrl + '?countryId=' + filter.countryId + '&yearId=' + filter.yearId + '&calendarTypeId=' + filter.calendarTypeId;
    return this.http.get(url)
      .pipe(
        map((response: Response) => response.rows || []),
        tap(_ => this.log('fetched days')),
        catchError(this.handleError<History[]>('getHistory', []))
      );
  }

  loadHistory(filter: Filter) {
    this.manageDataService.indicateLoadStatus('start');
    this.loadingChange.next(true);
    this.getHistory(filter).subscribe((days) => {
      this.historyChange.next(days);
      this.manageDataService.indicateLoadStatus('end');
      this.loadingChange.next(false);
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
