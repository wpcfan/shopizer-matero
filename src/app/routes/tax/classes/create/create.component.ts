import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { TaxService } from '../../+state/services/tax.service';

@Component({
  selector: 'app-tax-classes-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxClassesCreateComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private service: TaxService) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required], [this.uniqueCode()]],
      name: ['', [Validators.required]],
    });
  }

  uniqueCode() {
    return (control: any) => {
      return this.service.unique(control.value);
    };
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.service.create(this.form.value).pipe(take(1)).subscribe();
  }
}
