import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import * as UserActions from '../+state/actions/user.actions';

@Component({
  selector: 'app-users-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPasswordComponent implements OnInit {
  form: FormGroup;
  id$ = this.route.params.pipe(map(params => parseInt(params.id)));
  constructor(private store: Store, private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = this.fb.nonNullable.group(
      {
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: [this.validatePassword] }
    );
  }

  ngOnInit() {}

  validatePassword() {
    return (form: FormGroup) => {
      const password = form.get('password') as FormControl;
      const repeatPassword = form.get('repeatPassword') as FormControl;
      if (password.value !== repeatPassword.value) {
        repeatPassword.setErrors({ notMatch: true });
      } else {
        repeatPassword.setErrors(null);
      }
    };
  }

  changePassword(id: number) {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(
      UserActions.changePassword({
        id,
        password: this.form.value.password,
        repeatPassword: this.form.value.repeatPassword,
      })
    );
  }
}
