import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Language } from '@models';
import { isArray } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DescriptionsComponent,
      multi: true,
    },
  ],
})
export class DescriptionsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  _languages: Language[] = [];
  get languages() {
    return this._languages;
  }
  @Input() set languages(languages: Language[]) {
    this._languages = languages;
    if (languages.length > 0) {
      this.descriptions.clear();
    }
    languages.forEach(language => {
      this.descriptions.push(this.createDescription(language.code));
    });
  }
  @Input() ignoreFields: string[] = [];
  form!: FormGroup;
  descriptions: FormArray = this.fb.array([]);
  onChange: any = () => {};
  onTouch: any = () => {};
  isDisabled = false;
  sub = new Subscription();
  constructor(private fb: FormBuilder) {}
  writeValue(obj: any): void {
    if (obj && isArray(obj)) {
      obj.forEach((description, index) => {
        this.descriptions.at(index).patchValue(description);
      });
    }
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
    this.form = this.fb.group({
      descriptions: this.descriptions,
    });
    this.sub.add(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value.descriptions);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createDescription(language: string) {
    return this.fb.group({
      language: [language, Validators.required],
      title: [{ value: '', disabled: this.disableField('title') }],
      name: [{ value: '', disabled: this.disableField('name') }, Validators.required],
      friendlyUrl: [{ value: '', disabled: this.disableField('friendlyUrl') }],
      highlights: [{ value: '', disabled: this.disableField('highlights') }],
      metaDescription: [{ value: '', disabled: this.disableField('metaDescription') }],
      description: [{ value: '', disabled: this.disableField('description') }],
      keyWords: [{ value: '', disabled: this.disableField('keyWords') }],
    });
  }

  disableField(field: string) {
    return this.ignoreFields.includes(field);
  }

  getIndexedFormGroup(index: number) {
    return this.descriptions.controls[index] as FormGroup;
  }
}
