import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Language } from '@models';
import { Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
import { ContentBoxService } from '../+state/services/content-box.service';

@Component({
  selector: 'app-content-update-box',
  templateUrl: './update-box.component.html',
  styleUrls: ['./update-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentUpdateBoxComponent implements OnInit {
  languages$!: Observable<Language[]>;
  form!: FormGroup;
  selected$ = this.route.paramMap.pipe(
    filter(it => it.has('id')),
    map(it => Number(it.get('id'))),
    switchMap(id => this.service.get(id)),
    tap(it => this.form.patchValue(it))
  );
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ContentBoxService
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
