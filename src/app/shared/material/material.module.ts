import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MAT_BOTTOM_SHEET_CUSTOM_CONFIG, MAT_DATE_FORMATS_CUSTOM_CONFIG, MAT_DATE_LOCALE_CUSTOM_CONFIG, MAT_DIALOG_CUSTOM_CONFIG, MAT_FORM_FIELD_CUSTOM_CONFIG, MAT_LUXON_DATE_CUSTOM_CONFIG, MAT_PAGINATOR_CUSTOM_CONFIG, MAT_TABS_CUSTOM_CONFIG, MAT_TOOLTIP_CUSTOM_CONFIG } from './material.constants';
import { MatPaginatorCustomIntl } from './material.models';


@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: MAT_FORM_FIELD_CUSTOM_CONFIG,
    },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorCustomIntl,
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: MAT_PAGINATOR_CUSTOM_CONFIG,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: MAT_DATE_LOCALE_CUSTOM_CONFIG,
    },
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: MAT_TOOLTIP_CUSTOM_CONFIG,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_DATE_FORMATS_CUSTOM_CONFIG,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: MAT_DIALOG_CUSTOM_CONFIG,
    },
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: MAT_BOTTOM_SHEET_CUSTOM_CONFIG,
    },
    {
      provide: MAT_TABS_CONFIG,
      useValue: MAT_TABS_CUSTOM_CONFIG,
    },
  ],
})
export class MaterialModule {}
