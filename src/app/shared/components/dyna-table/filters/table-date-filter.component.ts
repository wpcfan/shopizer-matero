import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { endOfDay } from 'date-fns';
import { ColumnFilter } from '../column-filter.model';
import { DateFilter } from '../table-filter';

@Component({
  selector: 'ngx-table-date-filter',
  template: `
    <form (ngSubmit)="apply()">
      <h2 mat-dialog-title>过滤 {{ displayName }}</h2>

      <mat-dialog-content>
        <mat-form-field>
          <input
            matInput
            [max]="model.toDate || maxDate"
            [matDatepicker]="fromDate"
            name="fromDate"
            placeholder="起始时间"
            [(ngModel)]="model.fromDate"
            #fromDateControl="ngModel"
          />
          <mat-datepicker-toggle matSuffix [for]="fromDate"></mat-datepicker-toggle>
          <mat-datepicker #fromDate></mat-datepicker>
          <mat-error>起始时间错误</mat-error>
        </mat-form-field>

        <mat-form-field>
          <input
            matInput
            [min]="model.fromDate"
            [max]="maxDate"
            [matDatepicker]="toDate"
            name="toDate"
            placeholder="截止时间"
            [(ngModel)]="model.toDate"
            #toDateControl="ngModel"
          />
          <mat-datepicker-toggle matSuffix [for]="toDate"></mat-datepicker-toggle>
          <mat-datepicker #toDate></mat-datepicker>
          <mat-error>截止时间错误</mat-error>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions>
        <button
          mat-button
          mat-dialog-close
          [disabled]="fromDateControl.invalid || toDateControl.invalid"
        >
          清除
        </button>
        <button
          mat-button
          type="submit"
          [disabled]="fromDateControl.invalid || toDateControl.invalid"
        >
          应用
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [``],
})
export class TableDateFilterComponent implements OnInit {
  model!: DateFilter;

  displayName?: string;

  maxDate = endOfDay(Date.now());
  public constructor(
    private readonly dialogRef: MatDialogRef<TableDateFilterComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter
  ) {}

  ngOnInit() {
    this.displayName = this.filterData.column.header;
    this.model = (this.filterData.filter ||
      new DateFilter(this.filterData.column.name)) as DateFilter;
  }

  apply() {
    if (this.model.fromDate || this.model.toDate) {
      this.dialogRef.close(this.model);
    } else {
      this.dialogRef.close('');
    }
  }
}
