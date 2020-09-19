import {Day} from '../components/editing/entities/classes/day';
import {Filter} from '../components/filter/entities/classes/filter';

export class DialogData {
    day: Day;
    filter: Filter;

    constructor(day: Day, filter: Filter) {
        this.day = day,
            this.filter = filter;
    }
}

