import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaxClass } from '@models';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { TaxService } from '../../+state/services/tax.service';

@Component({
  selector: 'app-tax-classes-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxClassesUpdateComponent implements OnInit {
  form!: FormGroup;
  selected$!: Observable<TaxClass | undefined>;
  constructor(
    private fb: FormBuilder,
    private service: TaxService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
    });
    this.selected$ = this.route.paramMap.pipe(
      filter(it => it.has('code')),
      map(it => it.get('code') as string),
      switchMap(code => this.service.getByCode(code)),
      tap(it => this.form.patchValue(it))
    );
  }

  update(ev: Event, id: number) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.service.update(id, this.form.value).pipe(take(1)).subscribe();
  }
}
