import {Component, OnInit} from '@angular/core';
import {FilterService} from '../filter/entities/services/filter.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

    constructor(
        // tslint:disable-next-line:variable-name
        private _filterService: FilterService
    ) {}

    public isFilterFormValid = false;

    ngOnInit() {
        this._filterService.filterFormValid$.subscribe((value: boolean) => {
            this.isFilterFormValid = value;
        });
    }
}
