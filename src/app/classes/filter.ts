export class Filter {
  countryId: string;
  calendarTypeId: number;
  yearId: number;
  month: number|null;

  constructor(countryId: string, calendarTypeId:number, yearId: number, month:number = null) 
  {
  	this.countryId = countryId,
  	this.calendarTypeId = calendarTypeId;
  	this.yearId = yearId;
  	this.month = month;
  }
}