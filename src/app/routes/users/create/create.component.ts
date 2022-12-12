import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Group, Language, Menu, Merchant } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from '../+state/actions/user.actions';
import { UserService } from '../+state/service/user.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCreateComponent {
  form: FormGroup;
  menus$: Observable<Menu[]>;
  groups$: Observable<Group[]>;
  languages$: Observable<Language[]>;
  stores$: Observable<Merchant[]>;

  constructor(private store: Store, private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.nonNullable.group(
      {
        emailAddress: ['', [Validators.required, Validators.email], [this.emailValidator()]],
        merchant: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        groups: [[], [Validators.required]],
        defaultLanguage: ['en', [Validators.required]],
        active: [true],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: [this.validatePassword] }
    );
    this.menus$ = this.store.select(fromMenu.selectMenus);
    this.groups$ = this.store.select(fromProfile.selectGroups);
    this.languages$ = this.store.select(fromProfile.selectLanguages);
    this.stores$ = this.store.select(fromProfile.selectStores);
  }

  emailValidator(): AsyncValidatorFn {
    return control => this.userService.uniqueEmail(control.value);
  }

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

  compareGroup(a: Group, b: Group) {
    return a.id === b.id;
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(UserActions.createUser({ data: this.form.value }));
  }
}
