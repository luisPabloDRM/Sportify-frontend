import { contentChild, ContentChild, Directive, input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { Pagination } from '../../utils/pagination/pagination.models';

@Directive({
  selector: 'app-overview',
})
export class OverviewDirective implements OnInit {
  readonly pagination = input.required<Pagination<any>>();
  private readonly paginator = contentChild.required(MatPaginator);
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.watchPaginatorChanges();
  }

  private watchPaginatorChanges = () => {
    this.paginator()
      .page.pipe(takeUntil(this.destroy$))
      .subscribe((event) => {
        const page = event.pageIndex + 1;
        const size = event.pageSize;
        this.pagination().paginate(page, size);
      });
  };
}
