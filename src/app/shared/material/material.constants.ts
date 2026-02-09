import { MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDateFormats } from '@angular/material/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatPaginatorDefaultOptions } from '@angular/material/paginator';
import { MatTabsConfig } from '@angular/material/tabs';
import { MatTooltipDefaultOptions } from '@angular/material/tooltip';

export const MAT_BOTTOM_SHEET_CUSTOM_CONFIG: MatBottomSheetConfig = {
  autoFocus: false,
};

export const MAT_DATE_FORMATS_CUSTOM_CONFIG: MatDateFormats = {
  parse: {
    dateInput: 'd/L/yyyy',
  },
  display: {
    dateInput: 'dd/LL/yyyy',
    monthYearLabel: 'LLLL, yyyy',
    dateA11yLabel: 'yyyy',
    monthYearA11yLabel: 'LL yyyy',
  },
};

export const MAT_DATE_LOCALE_CUSTOM_CONFIG = 'es-ES';

export const MAT_DIALOG_CUSTOM_CONFIG: MatDialogConfig = {
  autoFocus: false,
  disableClose: true,
  width: '720px',
  maxHeight: '90vh',
  maxWidth: '90vw',
};

export const MAT_FORM_FIELD_CUSTOM_CONFIG: MatFormFieldDefaultOptions = {
  appearance: 'fill',
  subscriptSizing: 'dynamic',
};


export const MAT_PAGINATOR_CUSTOM_CONFIG: MatPaginatorDefaultOptions = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50],
  showFirstLastButtons: true,
  formFieldAppearance: 'outline',
};

export const MAT_TABS_CUSTOM_CONFIG: MatTabsConfig = {
  alignTabs: 'start',
  animationDuration: '0ms',
  stretchTabs: false,
  dynamicHeight: true,
};

export const MAT_TOOLTIP_CUSTOM_CONFIG: MatTooltipDefaultOptions = {
  showDelay: 100,
  hideDelay: 100,
  touchendHideDelay: 100,
  position: 'below',
};
