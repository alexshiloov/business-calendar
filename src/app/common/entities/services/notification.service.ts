import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {SnackbarComponent} from '../../../entities/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

	/**
	 * Дефолтный label (action) рядом с текстом сообщения
	 */
	private _defaultActionTxt: 'OK';

  	constructor(private _snackBar: MatSnackBar) { }

  	 /**
     * Основная ф-ия для показа уведомления, примеры вызова:
     * .show('some message') / .show('some message', 1500)
     * @param {string} msg
     * @param {number} duration
     */
    public show(msg: string, snackType: string = 'error', duration: number = 3000): void {
    	this._snackBar.openFromComponent(SnackbarComponent, {
	      duration: duration,
	      panelClass: ['blue-snackbar'],
	      verticalPosition: 'top',
	      data: { message: msg, snackType: snackType}
	    });
    }

}
