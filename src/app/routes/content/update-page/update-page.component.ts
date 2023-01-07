import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Language } from '@models';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { ContentPageService } from '../+state/services/content-page.service';
@Component({
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss'],
})
export class ContentUpdatePageComponent implements OnInit {
  languages$!: Observable<Language[]>;
  form!: FormGroup;
  selected$ = this.route.paramMap.pipe(
    filter(it => it.has('code')),
    map(it => it.get('code') as string),
    switchMap(code => this.service.get(code)),
    tap(it => this.form.patchValue({ ...it }))
  );
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ContentPageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required], [this.codeValidator()]],
      visible: [true],
      descriptions: [[]],
    });
    this.languages$ = this.store.select(fromProfile.selectStoreLanguages);
  }

  codeValidator(): AsyncValidatorFn {
    return control => this.service.unique(control.value);
  }

  update(id: number, ev: Event) {
    ev.preventDefault();
    if (this.form.valid) {
      this.service
        .update(id, this.form.value)
        .pipe(take(1))
        .subscribe(it => {
          this.router.navigate(['../'], {
            queryParamsHandling: 'merge',
            relativeTo: this.route,
          });
        });
    }
  }
}
