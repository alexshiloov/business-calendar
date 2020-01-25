import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  protected _loadStatus$$: ReplaySubject<number> = new ReplaySubject<number>(1);
  protected _loadCounter: number = 0;

  constructor() {
    this._loadStatus$$.next(this._loadCounter);
  }
  /**
   * Подписка на статус загрузки
   */
  public get loadStatus$(): Observable<number> {
    return this._loadStatus$$.asObservable();
  }

  /**
   * Функция, итерирующая последовательность статуса загрузки
   * @param {string} status
   * @private
   */
  public indicateLoadStatus(status: string): void {
    if (status === 'start') {
      this._loadCounter++;
    } else if (this._loadCounter > 0) {
      this._loadCounter--;
    }

    this._loadStatus$$.next(this._loadCounter);
  }
}
