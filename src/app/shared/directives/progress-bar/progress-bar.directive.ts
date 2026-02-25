import { Directive, input, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatProgressBar, ProgressBarMode } from '@angular/material/progress-bar';
import { combineLatest, map, tap } from 'rxjs';

@Directive({
  selector: 'app-progress-bar, [appProgressBar]',
})
export class ProgressBarDirective {
  readonly loading = input.required<boolean>();
  protected readonly component: MatProgressBar;
  protected readonly state$ = toObservable(this.loading).pipe(
    map((loading): ProgressBarMode => (loading ? 'indeterminate' : 'determinate')),
    tap((mode) => (this.component.mode = mode)),
    takeUntilDestroyed()
  );
  protected readonly autosuscribe = combineLatest([this.state$])
    .pipe(takeUntilDestroyed())
    .subscribe();

  constructor(private readonly viewContainerRef: ViewContainerRef) {
    this.component = this.viewContainerRef.createComponent(MatProgressBar).instance;
    this.component.color = 'primary';
    this.component.value = 100;
  }
}
