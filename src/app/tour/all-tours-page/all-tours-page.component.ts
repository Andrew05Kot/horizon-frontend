import { Component, OnInit } from '@angular/core';
import { TourService } from "../../_services/tour.service";
import { Tour } from "../../_models/tour.model";
import { PageEvent } from "@angular/material/paginator";
import { Page } from "../../_utils/model/page.model";
import { PagingUtils } from "../../_utils/paging-utils";
import { Filter } from "../../_utils/model/filter-model";
import { FilteringOperation } from "../../_constants/filtering-operations.constants";
import { SortingParameter } from "../../_models/sorting-parameter.model";

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
  sortingParameters: SortingParameter[] =
    [new SortingParameter('price', 'ціна'),
      new SortingParameter('eventDate', 'дата'),
      new SortingParameter('rate', 'рейтинг'),
      new SortingParameter('name', 'назва'),
    ];
  currentSorting = new SortingParameter('name', 'назва');

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

  sort(sortParam: SortingParameter) {
    this.currentSorting = sortParam;
    // this.currentSortDirection = 'ASC';
    this.tourService.getPage$(this.pageEvent.pageIndex,
                              this.pageEvent.pageSize,
                    [this.currentSorting.fieldKey + ',' + this.currentSortDirection.toUpperCase()],
                               this.buildFilters())
      .subscribe(response => this.processTourResponse(response));
  }

  private initTours(): void {
    this.tourService.getPage$(this.pageEvent.pageIndex,
                              this.pageEvent.pageSize,
                    [this.currentSorting.fieldKey + ',' + this.currentSortDirection.toUpperCase()],
                              this.buildFilters())
      .subscribe(response => this.processTourResponse(response));
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
