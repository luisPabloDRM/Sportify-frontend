import { Directive } from '@angular/core';

@Directive({
  selector: '[appCellNoData]',
  host: {
    '[style.padding]': '"1rem"',
    '[style.text-align]': '"center"',
    '[style.white-space]': '"normal"',
  },
})
export class CellNoDataDirective {}
