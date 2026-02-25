import { Directive, ElementRef, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { fromEvent, map, Subject, takeUntil, tap } from 'rxjs';
@Directive({
  selector: '[appTogglePassword]',
})
export class TogglePasswordDirective {
  readonly icon = input.required<MatIcon>();
  readonly iconButton = input.required<MatIconButton>();
  private readonly showing = signal<boolean>(false);
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly elementRef: ElementRef) {}

  public get iconElement() {
    return this.icon()._elementRef.nativeElement;
  }

  public get buttonElement() {
    return this.iconButton()._elementRef.nativeElement;
  }

  public get inputElement() {
    return this.elementRef.nativeElement as HTMLInputElement;
  }

  ngOnInit() {
    this.verifyInputElement();
    this.verifyPasswordInput();
    this.toggle();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected verifyInputElement = () => {
    const { nativeElement } = this.elementRef;

    if (nativeElement instanceof HTMLInputElement) {
      return;
    }
    throw new Error('Native element of toggle password directive must be input');
  };

  protected verifyPasswordInput = () => {
    const input = this.inputElement;

    if (input.type === 'password') {
      return;
    }
    throw new Error('Input type of toggle password directive must be password');
  };

  private toggle = () => {
    fromEvent(this.buttonElement, 'click')
      .pipe(
        takeUntil(this.destroy$),
        map(() => ({
          input: this.inputElement,
          icon: this.iconElement,
        })),
        tap(({ input, icon }) => {
          this.showing.set(!this.showing());
          if (this.showing()) {
            icon.innerHTML = 'visibility';
            input.type = 'text';
          } else {
            icon.innerHTML = 'visibility_off';
            input.type = 'password';
          }
        })
      )
      .subscribe();
  };
}
