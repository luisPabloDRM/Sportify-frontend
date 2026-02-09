import { BehaviorSubject } from 'rxjs';
import * as R from 'remeda';

export class Pagination<T> {
  private page: number;
  private size: number;
  private sortField: string;
  private sortOrder: OrderDirection;
  private filters: T;
  private defaultSortField: string;
  private defaultSortOrder: OrderDirection;
  private subject: BehaviorSubject<PaginationValues>;

  public get value() {
    return {
      page: this.page,
      size: this.size,
      filters: this.filters,
      sortOrder: this.sortOrder,
      sortField: this.sortField,
    };
  }

  constructor(values: Partial<PaginationValues> = {}) {
    this.page = values.page ?? 1;
    this.size = values.size ?? 10;
    this.sortField = values.sortField ?? 'id';
    this.sortOrder = values.sortOrder ?? 'asc';
    this.filters = values.filters ?? {};
    this.defaultSortField = values.sortField ?? 'id';
    this.defaultSortOrder = values.sortOrder ?? 'asc';
    this.subject = new BehaviorSubject<PaginationValues>(this.value);
  }

  paginate = (page: number, size: number) => {
    this.page = page;
    this.size = size;
    this.emit();
  };

  sort = (field?: string, order?: OrderDirection) => {
    if (R.isNonNullish(field) && R.isNonNullish(order)) {
      this.sortField = field;
      this.sortOrder = order;
    } else {
      this.sortField = this.defaultSortField;
      this.sortOrder = this.defaultSortOrder;
    }
    this.emit();
  };

  filter = (filters: T, replace: boolean = true) => {
    this.filters = replace ? filters : { ...this.filters, filters };
    this.page = 1;
    this.emit();
  };

  valueChanges = () => {
    return this.subject.asObservable();
  };

  private emit = () => {
    this.subject.next(this.value);
  };
}

export type PaginationValues = {
  page: number;
  size: number;
  sortField: string;
  sortOrder: OrderDirection;
  filters: any;
};

export type PaginatedData<T> = {
  data: T[];
  meta: {
    total: number;
    firstPage: number;
    lastPage: number;
    currentPage: number;
  };
};

export type PaginationFilterType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'arrayNumber'
  | 'arrayString';

export type OrderDirection = 'asc' | 'desc';
