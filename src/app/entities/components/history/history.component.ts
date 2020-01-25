import {Component, OnInit, ViewChild} from '@angular/core';
import {HistoryService} from '../../services/history.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private historyService: HistoryService
  ) {
  }

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['updateDate', 'row'];

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  ngOnInit() {
    this.historyService.historyChange.subscribe((days) => {
      this.dataSource = new MatTableDataSource(days);
    });
  }

}
