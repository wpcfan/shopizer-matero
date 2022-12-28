import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { isArray } from 'lodash';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectionListComponent,
      multi: true,
    },
  ],
})
export class SelectionListComponent implements ControlValueAccessor, OnInit {
  availableOptions: SelectOption[] = [];
  selectedOptions: SelectOption[] = [];
  @Input() set options(options: SelectOption[]) {
    this.availableOptions = options;
  }
  onChange = (value: any) => {};
  onTouch = () => {};
  isDisabled = false;
  constructor() {}
  writeValue(obj: any): void {
    if (obj && isArray(obj)) {
      this.selectedOptions = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onChange = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {}

  moveToRight(selected: SelectionModel<MatListOption>) {
    this.availableOptions = this.availableOptions.filter(
      option =>
        selected.selected.find(selectedOption => selectedOption.value.label === option.label) ===
        undefined
    );

    this.selectedOptions = this.selectedOptions.concat(
      selected.selected.map(selectedOption => selectedOption.value)
    );
    this.onChange(this.selectedOptions);
  }

  moveToLeft(selected: SelectionModel<MatListOption>) {
    this.selectedOptions = this.selectedOptions.filter(
      option =>
        selected.selected.find(selectedOption => selectedOption.value.label === option.label) ===
        undefined
    );
    this.availableOptions = this.availableOptions.concat(
      selected.selected.map(selectedOption => selectedOption.value)
    );
    this.onChange(this.selectedOptions);
  }
}
