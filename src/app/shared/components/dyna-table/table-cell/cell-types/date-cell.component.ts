import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ColumnConfig } from '../../column-config.model';
import { CellComponent } from './cell.component';

@Component({
  selector: 'ngx-date-cell',
  template: `
    <span matTooltip="{{ column.cell!(row) | date : dateTooltipFormat }}">{{
      column.cell!(row) | date : dateFormat
    }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateCellComponent implements CellComponent, OnInit {
  @Input() column!: ColumnConfig;
  @Input() row!: object;

  dateFormat = 'yyyy-MM-dd';
  dateTooltipFormat = 'yyyy-MM-dd HH:mm:ss';

  ngOnInit() {
    if (this.column.options) {
      if (this.column.options.dateFormat) {
        this.dateFormat = this.column.options.dateFormat;
      }
    }
  }
}
