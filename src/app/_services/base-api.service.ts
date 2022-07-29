import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Page} from "../_utils/model/page.model";
import {Filter} from "../_utils/model/filter-model";
import {PagingUtils} from "../_utils/paging-utils";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService<T> {

  apiPath: string;

  constructor(public http: HttpClient) {
    this.apiPath = environment.apiUrl + this.getApiName();
  }

  abstract getApiName(): string;

  create$(entity: T): Observable<T> {
    return this.http.post<T>(this.apiPath, entity);
  }

  getPage$(page: number, amount: number, sortOptions?: string[], filters?: Filter[], expandFields?: string): Observable<Page<T>> {
    let queryParams = new HttpParams()
      .set('pageNo', page.toString())
      .set('pageSize', amount.toString());

    if (filters && filters !== undefined) {
      for (const filter of filters) {
        if (filter.key && filter.operation && filter.value) {
          queryParams = queryParams.append('search', PagingUtils.getFilterValue(filter));
        }
      }
    }

    if (sortOptions && sortOptions !== undefined) {
      for (const sortOption of sortOptions) {
        queryParams = queryParams.append('sort', sortOption);
      }
    }

    if (expandFields && expandFields !== undefined) {
      queryParams = queryParams.append('expand', expandFields);
    }

    return this.http.get<Page<T>>(this.apiPath, {params: queryParams});
  }

  getList$( sortOptions?: string[], filters?: Filter[], expandFields?: string): Observable<Page<T>> {
    let queryParams = new HttpParams();

    if (filters && filters !== undefined) {
      for (const filter of filters) {
        if (filter.key && filter.operation && filter.value) {
          queryParams = queryParams.append('search', PagingUtils.getFilterValue(filter));
        }
      }
    }

    if (sortOptions && sortOptions !== undefined) {
      for (const sortOption of sortOptions) {
        queryParams = queryParams.append('sort', sortOption);
      }
    }

    if (expandFields && expandFields !== undefined) {
      queryParams = queryParams.append('expand', expandFields);
    }

    return this.http.get<Page<T>>(this.apiPath + '/unpaged', {params: queryParams});
  }

  getById$(id: number, expandField?: string): Observable<T> {
    let queryParams = new HttpParams();
    if (expandField && expandField !== undefined) {
      queryParams = queryParams.append('expand', expandField);
    }
    return this.http.get<T>(this.apiPath + `/${id}`, {params: queryParams});
  }

  update$(id: number, entity: T):  Observable<T> {
    return this.http.put<T>(this.apiPath + `/${id}`, entity);
  }

  delete$(id: number): Observable<void> {
    return this.http.delete<void>(this.apiPath + `/${id}`);
  }
}
