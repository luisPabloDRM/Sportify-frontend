import { Directive, input } from '@angular/core';
import { ThemeColor } from '../../models/theme.models';

@Directive({
  selector: 'app-chip',
  host: {
    '[class]': 'color()',
  },
})
export class ChipDirective {
  readonly color = input.required<ThemeColor>();
}
