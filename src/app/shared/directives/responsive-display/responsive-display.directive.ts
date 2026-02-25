import {
  ChangeDetectorRef,
  Directive,
  input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  takeUntil,
} from 'rxjs';
import { ResponsiveDisplayMode } from './responsive-display.constants';

@Directive({
  selector: '[appResponsiveDisplay]',
})
export class ResponsiveDisplayDirective implements OnInit {
  // TODO: review
  public readonly mode = input<ResponsiveDisplayMode | undefined>(undefined, {
    alias: 'appResponsiveDisplay',
  });
  public readonly breakpoint = input<number>(1024);
  protected readonly destroy$ = new Subject<void>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.watchResizeChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected watchResizeChange = () => {
    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(100),
        startWith(0),
        map(() =>
          window.innerWidth > this.breakpoint()
            ? ResponsiveDisplayMode.Desktop
            : ResponsiveDisplayMode.Compact
        ),
        distinctUntilChanged()
      )
      .subscribe((mode) => {
        mode === this.mode()
          ? this.viewContainerRef.createEmbeddedView(this.templateRef)
          : this.viewContainerRef.clear();
        this.changeDetectorRef.detectChanges();
      });
  };
}
