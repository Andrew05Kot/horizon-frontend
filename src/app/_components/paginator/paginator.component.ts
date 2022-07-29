import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Output() pageInfo = new EventEmitter<PageEvent>();
  @Input() pageNumber = 0;
  @Input() buttonPages: number[];
  private _count;
  private _pageSize;

  @Input() set pageSize(value) {
    if (value) {
      this._pageSize = value;
      this.setCountOfButtons();
    }
  }

  @Input() set count(value) {
    if (value >= 0) {
      this._count = value;
      this.setCountOfButtons();
    }
  }

  @Input() set filterdata(value: string) {
    if (value) {
      this.setCountOfButtons();
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.setCountOfButtons();
  }

  setPage(page: number): void {
    if (page < 0 || page > this.getNumberOfPages() || this.pageNumber === page) {
      return;
    }
    this.pageNumber = page;
    this.getPage(this.pageNumber, this._pageSize);
  }

  getPage(pageNumber: number, pageSize: number): void {
    const pageEvent: PageEvent = new PageEvent();
    pageEvent.pageIndex = pageNumber;
    pageEvent.pageSize = pageSize;
    pageEvent.length = this._count;
    this.pageInfo.emit(pageEvent);
  }

  setCountOfButtons(): void {
    this.buttonPages = [];
    for (let i = 0; i <= this.getNumberOfPages(); i++) {
      this.buttonPages.push(i);
    }
    this.pageNumber = 0;
  }

  checkIfFirstPage(): boolean | void {
    if (this.buttonPages) {
      return this.pageNumber === this.buttonPages[0];
    }
  }

  checkIfLastPage(): boolean | void {
    if (this.buttonPages) {
      return this.pageNumber === this.buttonPages.length - 1;
    }
  }

  getNumberOfPages(): number {
    const result = this._count / this._pageSize;
    return Math.floor(this._count % this._pageSize === 0 ? result - 1 : result);
  }

}
