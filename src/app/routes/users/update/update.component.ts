import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Group, Language, Menu, Merchant, Profile } from '@models';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import * as UserActions from '../+state/actions/user.actions';
import * as fromUser from '../+state/selectors/user.selectors';
@Component({
  selector: 'app-users-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersUpdateComponent implements OnInit {
  form: FormGroup;
  menus$: Observable<Menu[]>;
  groups$: Observable<Group[]>;
  languages$: Observable<Language[]>;
  stores$: Observable<Merchant[]>;
  id$: Observable<number>;
  user$: Observable<Profile | undefined>;

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute) {
    this.form = this.fb.nonNullable.group(
      {
        emailAddress: ['', [Validators.required, Validators.email]],
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
    this.id$ = this.route.params.pipe(
      map(params => parseInt(params.id)),
      tap(id => this.store.dispatch(UserActions.getById({ id })))
    );

    this.user$ = this.store.select(fromUser.selectUser).pipe(
      tap(user => {
        if (user) {
          this.form.patchValue(user);
        }
      })
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

  compareGroup(a: Group, b: Group) {
    return a.id === b.id;
  }

  update(id: number) {
    this.store.dispatch(UserActions.updateUser({ data: this.form.value, id }));
  }

  delete(id: number) {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }
}
