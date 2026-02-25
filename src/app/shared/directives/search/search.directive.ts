import { Directive, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, fromEvent, map, tap } from 'rxjs';

@Directive({
  selector: '[appSearch]',
})
export class SearchDirective {
  protected readonly elementRef = inject(ElementRef<HTMLElement>);
  @Input()
  delay: number = 250;

  @Output()
  search = new EventEmitter<string>();

  private readonly search$ = fromEvent<Event>(this.elementRef.nativeElement, 'input').pipe(
    takeUntilDestroyed(),
    map(({ target }) => (target as HTMLInputElement).value),
    debounceTime(this.delay),
    tap((pattern) => this.search.emit(pattern)),
  );
  private readonly _autosuscribe = combineLatest([this.search$]).subscribe();


  ngOnInit(): void {
    if (!(this.elementRef.nativeElement instanceof HTMLInputElement)) {
      throw new Error('Element for "search directive" must be an input');
    }
  }
}
