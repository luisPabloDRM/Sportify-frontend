import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appDisabled]',
  host: {
    '[style.pointer-events]': 'disabled() ? "none" : "inherit"',
    '[attr.disabled]': 'disabled() ? true : undefined',
  },
})
export class DisabledDirective {
  readonly disabled = input<boolean>(false, { alias: 'appDisabled' });
}
