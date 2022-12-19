import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { environment } from '@env/environment';

@Component({
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RichEditorComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useFactory: () => forwardRef(() => RichEditorComponent),
      multi: true,
    },
  ],
})
export class RichEditorComponent implements ControlValueAccessor, Validator {
  content?: string;
  apiKey = environment.tinyMCEApiKey;
  tinyMCEConfig = {
    selector: 'textarea', // change this value according to your HTML
    menu: {
      main: { title: 'Menu', items: 'code' },
    },
    plugins: 'code', // required by the code menu item
    menubar: 'main', // adds main to the menu bar
  };
  onChange: any = () => {};
  onTouch: any = () => {};
  onValidatorChange: any = () => {};
  isDisabled = false;

  writeValue(obj: any): void {
    this.content = obj;
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

  validate(control: AbstractControl): ValidationErrors | null {
    return this.content && typeof this.content === 'string' ? null : { isStringContent: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  handleContentChange(content: string) {
    this.content = content;
    this.onChange(content);
  }
}
