import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ColumnFilter } from '../column-filter.model';
import { SelectFilter } from '../table-filter';

@Component({
  selector: 'ngx-table-select-filter',
  template: `
    <form (ngSubmit)="apply()">
      <h2 mat-dialog-title>过滤 {{ displayName }}</h2>

      <mat-dialog-content>
        <mat-form-field>
          <mat-select placeholder="请选择" name="value" [(ngModel)]="model.value">
            <mat-option *ngFor="let item of options$ | async" [value]="item.value">
              {{ item.label }}
            </mat-option>
          </mat-select>
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
export class TableSelectFilterComponent implements OnInit {
  model!: SelectFilter;

  displayName?: string;
  options$!: Observable<{ value: string; label: string }[]>;

  public constructor(
    private readonly dialogRef: MatDialogRef<TableSelectFilterComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter
  ) {}

  ngOnInit() {
    this.displayName = this.filterData.column.header;
    this.model = (this.filterData.filter ||
      new SelectFilter(this.filterData.column.name)) as SelectFilter;
    this.options$ = this.filterData.column.filterOptions || of([]);
  }

  apply() {
    if (this.model.value) {
      this.dialogRef.close(this.model);
    } else {
      this.dialogRef.close('');
    }
  }
}
