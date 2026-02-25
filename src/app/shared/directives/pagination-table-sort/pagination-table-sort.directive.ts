import { Directive, input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Pagination } from '../../utils/pagination/pagination.models';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appPaginationTableSort]',
})
export class PaginationTableSortDirective implements OnInit, OnDestroy {
  readonly pagination = input.required<Pagination<any>>();
  private readonly destroy$ = new Subject<void>();

  constructor(@Optional() private readonly matSort: MatSort) {}

  ngOnInit(): void {
    if (!this.matSort) {
      throw new Error('Material sort directive is required to be present');
    }
    this.watchSortChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private watchSortChanges = () => {
    this.matSort.sortChange.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (!event.direction) {
        return this.pagination().sort();
      }
      const field = event.active;
      const direction = event.direction === 'asc' ? 'asc' : 'desc';
      this.pagination().sort(field, direction);
    });
  };
}
