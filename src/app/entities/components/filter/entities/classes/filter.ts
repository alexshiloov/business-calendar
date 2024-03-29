export class Filter {
    public countryId: string;
    public calendarTypeId: number;
    public yearId: number;
    public month: number | null;

    constructor(countryId: string, calendarTypeId: number, yearId: number, month: number = null) {
        this.countryId = countryId;
        this.calendarTypeId = calendarTypeId;
        this.yearId = yearId;
        this.month = month;
    }
}
