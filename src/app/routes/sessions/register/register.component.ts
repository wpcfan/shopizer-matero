import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '@core/+state/actions';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  stateProvinces$ = this.store.select(fromProfile.selectZones);
  countries$ = this.store.select(fromProfile.selectCountries);
  form: FormGroup;
  sub = new Subscription();

  constructor(private fb: FormBuilder, private store: Store, private location: Location) {
    this.form = this.fb.nonNullable.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        postalCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        stateProvince: [
          '',
          [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
        ],
        country: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        acceptTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: [this.matchValidator('password', 'confirmPassword')],
      }
    );
  }

  ngOnInit(): void {
    this.sub.add(
      this.form
        .get('country')
        ?.valueChanges.pipe(filter(countryCode => !!countryCode))
        .subscribe(countryCode => {
          this.store.dispatch(AuthActions.loadZones({ countryCode }));
        })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  matchValidator(source: string, target: string) {
    return (control: AbstractControl) => {
      const sourceControl = control.get(source)!;
      const targetControl = control.get(target)!;
      if (targetControl.errors && !targetControl.errors.mismatch) {
        return null;
      }
      if (sourceControl.value !== targetControl.value) {
        targetControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        targetControl.setErrors(null);
        return null;
      }
    };
  }

  register(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(
      AuthActions.register({ signup: { ...this.form.value, url: this.location.path() } })
    );
  }
}
