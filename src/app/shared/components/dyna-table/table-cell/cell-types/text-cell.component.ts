import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColumnConfig } from '../../column-config.model';
import { CellComponent } from './cell.component';

@Component({
  selector: 'ngx-text-cell',
  template: `
    <span *ngIf="displayText.length > truncateSize; else noTruncate" matTooltip="{{ displayText }}"
      >{{ displayText | slice : 0 : truncateSize }}...
    </span>
    <ng-template #noTruncate> {{ displayText }} </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextCellComponent implements CellComponent {
  @Input() column!: ColumnConfig;
  @Input() row!: object;

  get displayText() {
    return this.column.cell!(this.row) || '';
  }

  get truncateSize() {
    return !!this.column.options && !!this.column.options.truncate
      ? this.column.options.truncate
      : 30;
  }
}
