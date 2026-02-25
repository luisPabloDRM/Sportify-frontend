import { AfterViewInit, Directive, ElementRef, input, OnDestroy, signal } from '@angular/core';
import { Subject, debounceTime, fromEvent, map, startWith, takeUntil } from 'rxjs';
import * as R from 'remeda';

@Directive({
  selector: '[appTableColumns]',
  exportAs: 'appTableColumns',
})
export class TableColumnsDirective implements AfterViewInit, OnDestroy {
  readonly columns = input.required<{ name: string; width: number }[]>();
  protected readonly destroy$ = new Subject<void>();
  protected readonly nativeElement: HTMLElement;
  // TODO: output?
  public readonly visible = signal<string[]>([]);

  constructor(elementRef: ElementRef) {
    this.nativeElement = elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.watchWindowResize();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected watchWindowResize = () => {
    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(50),
        startWith(true),
        map(() => this.nativeElement.clientWidth)
      )
      .subscribe((width) => this.calculateVisibleColumns(width));
  };

  protected calculateVisibleColumns = (width: number) => {
    const visible = R.pipe(
      R.filter(this.columns(), (column) => column.width <= width),
      R.map(R.prop('name'))
    );
    this.visible.set(visible);
  };
}
