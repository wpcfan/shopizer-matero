import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, map, Observable, startWith } from 'rxjs';

export interface FilteredOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-autocomplete-select',
  templateUrl: './autocomplete-select.component.html',
  styleUrls: ['./autocomplete-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteSelectComponent,
      multi: true,
    },
  ],
})
export class AutocompleteSelectComponent implements ControlValueAccessor, OnInit {
  query: FormControl = new FormControl('');
  @Input() options: FilteredOption[] = [];
  @Input() filterFn = (value: any) => {
    if (value === '') {
      return this.options;
    }
    let filterValue: string;
    if (typeof value === 'string') {
      filterValue = this._normalizeValue(value);
    } else {
      filterValue = this._normalizeValue(value.label);
    }
    return this.options.filter(option => this._normalizeValue(option.label).includes(filterValue));
  };
  @Input() emitFilterChange = false;
  @Input() filterDebounceTime = 300;
  @Output() filterChanged = new EventEmitter<string>();
  filteredOptions$!: Observable<FilteredOption[]>;
  onChange: any = () => {};
  onTouch: any = () => {};
  onValidatorChange: any = () => {};
  isDisabled = false;

  writeValue(obj: any): void {
    this.query.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.filteredOptions$ = this.query.valueChanges.pipe(
      startWith(''),
      debounceTime(this.filterDebounceTime),
      map(value => this.filterFn(value ?? ''))
    );
  }

  handleSelection(ev: MatAutocompleteSelectedEvent) {
    this.onChange(ev.option.value);
  }

  displayFn(ev: FilteredOption) {
    return ev.label;
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
