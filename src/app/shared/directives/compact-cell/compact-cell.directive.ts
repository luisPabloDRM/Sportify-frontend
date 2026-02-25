import { Directive } from '@angular/core';

@Directive({
  selector: '[appCompactCell]',
  host: {
    '[style.max-width]': '"unset"',
    '[style.text-align]': '"center"',
    '[style.text-overview]': '"unset"',
    '[style.white-space]': '"normal"',
    '[style.width]': '"1px"',
  },
})
export class CompactCellDirective {}
