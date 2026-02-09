import { MatPaginatorIntl } from '@angular/material/paginator';

export class MatPaginatorCustomIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.previousPageLabel = 'Página anterior';
    this.nextPageLabel = 'Página siguiente';
    this.itemsPerPageLabel = 'Elementos por página';
    this.firstPageLabel = 'Primera página';
    this.lastPageLabel = 'Última página';

    this.getRangeLabel = (page, size, length) => {
      const rangeTop = (page + 1) * size;
      const topLiteral = rangeTop > length ? length : rangeTop;
      return `${page * size + 1} - ${topLiteral} de ${length}`;
    };
  }
}
