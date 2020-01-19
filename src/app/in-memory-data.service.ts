import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Day } from './classes/day';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const days = [
      { id: 11, dayNum: 3, weekName: 'пн', weekTypeId: 1 },
      { id: 12, dayNum: 2, weekName: 'Narco', weekTypeId: 1 },
      { id: 13, dayNum: 1, weekName: 'Bombasto', weekTypeId: 1 },
      { id: 14, dayNum: 4, weekName: 'Celeritas', weekTypeId: 1 },
      { id: 15, dayNum: 5, weekName: 'Magneta', weekTypeId: 1 },
      { id: 16, dayNum: 6, weekName: 'RubberMan', weekTypeId: 1 },
      { id: 17, dayNum: 7, weekName: 'Dynama', weekTypeId: 1 },
      { id: 18, dayNum: 8, weekName: 'Dr IQ', weekTypeId: 1 },
      { id: 19, dayNum: 11, weekName: 'Magma', weekTypeId: 1 },
      { id: 20, dayNum: 12, weekName: 'Tornado', weekTypeId: 1 }
    ];

    const historyDays = [
      { name: 'пн' },
      { name: 'пн2' },
      { name: 'пн3' },
      { name: 'пн4' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн2' },
      { name: 'пн3' },
      { name: 'пн4' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн2' },
      { name: 'пн3' },
      { name: 'пн4' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн2' },
      { name: 'пн3' },
      { name: 'пн4' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн2' },
      { name: 'пн3' },
      { name: 'пн4' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн' },
      { name: 'пн2' },
      { name: 'пн3' },
      { name: 'пн4' },
      { name: 'пн' },
      { name: 'пн' }
    ];
    return {days, historyDays};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(days: Day[]): number {
    return days.length > 0 ? Math.max(...days.map(day => day.dayTypeId)) + 1 : 11;
  }
}