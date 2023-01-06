import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Description, Language } from '@models';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ContentBoxService } from '../+state/services/content-box.service';
@Component({
  selector: 'app-content-create-box',
  templateUrl: './create-box.component.html',
  styleUrls: ['./create-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentCreateBoxComponent implements OnInit {
  languages$!: Observable<Language[]>;
  form!: FormGroup;
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

  create(ev: Event) {
    ev.preventDefault();
    if (this.form.valid) {
      const value = {
        ...this.form.value,
        descriptions: this.form.value.descriptions.map((description: Description) => ({
          ...description,
          name: this.form.value.code,
        })),
      };
      this.service
        .create(value)
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
