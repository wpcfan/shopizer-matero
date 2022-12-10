import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnFilter } from '../column-filter.model';
import { TextFilter } from '../table-filter';

@Component({
  selector: 'ngx-table-text-filter',
  template: `
    <form (ngSubmit)="apply()">
      <h2 mat-dialog-title>过滤 {{ displayName }}</h2>

      <mat-dialog-content>
        <mat-form-field>
          <input
            type="text"
            matInput
            placeholder="请输入关键字"
            name="value"
            [(ngModel)]="model.value"
          />
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button mat-button mat-dialog-close>清除</button>
        <button mat-button type="submit">应用</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableTextFilterComponent implements OnInit {
  model!: TextFilter;

  displayName?: string;

  public constructor(
    private readonly dialogRef: MatDialogRef<TableTextFilterComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter
  ) {}

  ngOnInit() {
    this.displayName = this.filterData.column.header;
    this.model = (this.filterData.filter ||
      new TextFilter(this.filterData.column.name)) as TextFilter;
  }

  apply() {
    if (this.model.value) {
      this.dialogRef.close(this.model);
    } else {
      this.dialogRef.close('');
    }
  }
}
