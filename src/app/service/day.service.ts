import { Injectable } from '@angular/core';
import {Day} from '../classes/day';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Response} from '../classes/response';
import {Filter} from '../classes/filter';


@Injectable({
  providedIn: 'root'
})
export class DayService {

  private dayUrl = 'http://localhost:80/php/getCalendarInfo.php';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  days: Day[];
  daysChange: Subject<Day[]> = new Subject<Day[]>();
  
  constructor(private http: HttpClient) {
  	this.daysChange.subscribe((days) => {
        this.days = days
    }); 
  }

  /** GET heroes from the server */
  getDays(filter: Filter): Observable<Day[]> {
  	let url = this.dayUrl + '?month='+ filter.month + '&countryId=' + filter.countryId + '&yearId=' + filter.yearId + '&calendarTypeId=' + filter.calendarTypeId;
    return this.http.get(url)
      .pipe(
      	map((response: Response) => response.rows || []),
        tap(_ => this.log('fetched days')),
        catchError(this.handleError<Day[]>('getDays', []))
      );
  }

  loadDays(filter: Filter) {
  	this.getDays(filter).subscribe((days) => {
  		this.daysChange.next(days);
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
