import { Component, OnInit } from '@angular/core';
import { TourService } from "../../_services/tour.service";
import { Tour } from "../../_models/tour.model";
import { PageEvent } from "@angular/material/paginator";
import { Page } from "../../_utils/model/page.model";
import { PagingUtils } from "../../_utils/paging-utils";
import { Filter } from "../../_utils/model/filter-model";
import { FilteringOperation } from "../../_constants/filtering-operations.constants";

@Component({
  selector: 'app-all-tours-page',
  templateUrl: './all-tours-page.component.html',
  styleUrls: ['./all-tours-page.component.scss']
})
export class AllToursPageComponent implements OnInit {

  pageEvent: PageEvent;
  tours: Tour[] = [];
  pageIndex: number = 0;
  itemsTotal: number = 0;
  pageSize: number = 12;
  filter: string = '';
  currentSortDirection = 'DESC';

  constructor(private tourService: TourService) {
  }

  ngOnInit(): void {
    this.pageEvent = PagingUtils.getPageEvent(this.pageSize, this.pageIndex);
    this.initTours();
  }

  loadPageHandler(event: PageEvent): void {
    this.pageIndex = 0;
    this.pageEvent = event;
    this.initTours();
  }

  private initTours(): void {
    this.tourService.getPage$(this.pageEvent.pageIndex, this.pageEvent.pageSize, ['name,' + this.currentSortDirection.toUpperCase()], this.buildFilters())
      .subscribe(response => this.processTourResponse(response) );
  }

  private processTourResponse(responsePage: Page<Tour>): void {
    this.tours = responsePage?.items;
    this.itemsTotal = responsePage?.count;
  }

  private buildFilters(): Filter[] {
    const filters = [
      new Filter('nameOrDescription', FilteringOperation.CONTAIN, this.filter)
    ];
    return filters;
  }

}
