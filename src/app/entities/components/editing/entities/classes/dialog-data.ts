import {Day} from './day';
import {Filter} from '../../../filter/entities/classes/filter';

export class DialogData {
    day: Day;
    filter: Filter;

    constructor(day: Day, filter: Filter) {
        this.day = day,
            this.filter = filter;
    }
}

