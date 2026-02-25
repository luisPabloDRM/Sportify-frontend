import { Directive, ElementRef, input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { Subject, filter, map, startWith, takeUntil } from 'rxjs';
import { FORM_ERROR_MESSAGE_MAP } from './form-error.constants';
import pupa from 'pupa';
import * as R from 'remeda';

@Directive({
  selector: '[appFormError]',
})
export class FormErrorDirective implements OnInit, OnDestroy {
  readonly controlName = input<string>();
  readonly control = input<FormControl>();
  private readonly destroy$ = new Subject<void>();
  private readonly errorMessages = FORM_ERROR_MESSAGE_MAP;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly formGroupDirective: FormGroupDirective,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const form = this.formGroupDirective.form;

    if (!form) {
      throw new Error('Form error directive requires to be inside form group to work');
    }

    const controlName = this.controlName();
    const control = R.isNonNullish(this.control())
      ? this.control()
      : controlName
        ? form.get(controlName)
        : undefined;

    if (!control) {
      throw new Error(`Control with name ${this.controlName()} not found in form group`);
    }
    this.trackStatus(control);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private trackStatus = (control: AbstractControl) => {
    control.statusChanges
      .pipe(
        startWith(control.status),
        takeUntil(this.destroy$),
        filter((status) => status === 'INVALID'),
        map(() => {
          const error = Object.entries(control.errors ?? {})[0];
          return [error[0], error[1]];
        })
      )
      .subscribe(([error, params]) => this.updateErrorMessage(error, params));
  };

  private updateErrorMessage = (error: string, params: Record<string, any>) => {
    const message = this.errorMessages.get(error);

    if (message) {
      const parameters = params instanceof Object ? params : {};
      const interpolated = pupa(message, parameters, { ignoreMissing: true });
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', interpolated);
    }
  };
}
