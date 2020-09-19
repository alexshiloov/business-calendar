import {Injectable} from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Response} from '../classes/response';
import {HttpClient} from '@angular/common/http';
import {ManageDataService} from './manage-data.service';
import {NotificationService} from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    constructor(
        // tslint:disable-next-line:variable-name
        private _http: HttpClient,
        // tslint:disable-next-line:variable-name
        private _manageDataService: ManageDataService,
        // tslint:disable-next-line:variable-name
        private _notificationService: NotificationService
    ) {}

    getData(url: string, subject: BehaviorSubject<any>, errorMsg: string) {
        this._manageDataService.indicateLoadStatus('start');
        this._http.get(url)
            .pipe(
                catchError(err => {
                    this._notificationService.show(errorMsg);
                    this._manageDataService.indicateLoadStatus('end');
                    return throwError(err);
                })
            )
            .subscribe(
                (response: Response) => {
                    this._manageDataService.indicateLoadStatus('end');
                    subject.next(response.rows);
                }
            );
    }
}
