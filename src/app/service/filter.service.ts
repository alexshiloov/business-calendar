import { Injectable } from '@angular/core';
import {IdName} from '../classes/id-name';
import {Response} from '../classes/response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  
  private yearUrl = 'http://localhost:80/php/getYear.php';  // URL to web api
  private countryUrl = 'http://localhost:80/php/getCountryId.php';  // URL to web api
  private calendarTypeUrl = 'http://localhost:80/php/getCalendarType.php';  // URL to web api
  private monthUrl = 'http://localhost:80/php/getMonth.php';  // URL to web api
  private dayTypeUrl = 'http://localhost:80/php/getWeekType.php';  // URL to web api

  public selectedCombos: boolean = false;
  public selectedMonth: boolean = false;
  public selectedMonthChange: Subject<boolean> = new Subject<boolean>();
  public selectedCombosChange: Subject<boolean> = new Subject<boolean>();
  public dayTypes: IdName[];

  constructor(private http: HttpClient) {
  	this.selectedCombosChange.subscribe((value) => {
        this.selectedCombos = value
    }); 

    this.selectedMonthChange.subscribe((value) => {
        this.selectedMonth = value
    }); 

    this.getDayTypes().subscribe((types) => {
        this.dayTypes = types
    }); 
  } 

  getDayTypes(): Observable<IdName[]> {
  	return this.http.get(this.dayTypeUrl)
	  	.pipe(
	  		map((response: Response) => response.rows || []),
		    tap(_ => this.log('fetched days')),
		    catchError(this.handleError<any[]>('getDayTypes', []))
		);
  }

   /** GET heroes from the server */
  getCalendarTypes(): Observable<IdName[]> {
  	return this.http.get(this.calendarTypeUrl)
	  	.pipe(
	  		map((response: Response) => response.rows || []),
		    tap(_ => this.log('fetched days')),
		    catchError(this.handleError<any[]>('getYears', []))
		);
  }


  /** GET heroes from the server */
  getYears(): Observable<IdName[]> {
  	return this.http.get(this.yearUrl)
	  	.pipe(
	  		map((response: Response) => response.rows || []),
		    tap(_ => this.log('fetched days')),
		    catchError(this.handleError<any[]>('getYears', []))
		);
  }

  getCountries(): Observable<IdName[]> {
  	return this.http.get(this.countryUrl)
	  	.pipe(
	  		map((response: Response) => response.rows || []),
		    tap(_ => this.log('fetched days')),
		    catchError(this.handleError<any[]>('getYears', []))
		);
  }

  getMonths(): Observable<IdName[]> {
  	return this.http.get(this.monthUrl)
	  	.pipe(
	  		map((response: Response) => response.rows || []),
		    tap(_ => this.log('fetched days')),
		    catchError(this.handleError<any[]>('getYears', []))
		);
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
