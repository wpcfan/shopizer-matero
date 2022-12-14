import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Group } from '@models';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { map, take, tap } from 'rxjs';
import * as UserActions from '../+state/actions/user.actions';
import * as fromUser from '../+state/selectors/user.selectors';
@Component({
  selector: 'app-users-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersUpdateComponent {
  form: FormGroup;
  groups$ = this.store.select(fromProfile.selectGroups);
  languages$ = this.store.select(fromProfile.selectLanguages);
  stores$ = this.store.select(fromProfile.selectStores);
  id$ = this.route.params.pipe(
    map(params => parseInt(params.id)),
    tap(id => this.store.dispatch(UserActions.getById({ id })))
  );
  user$ = this.store.select(fromUser.selectUser).pipe(
    tap(user => {
      if (user) {
        this.form.patchValue(user);
      }
    })
  );

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.form = this.fb.nonNullable.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      merchant: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      groups: [[], [Validators.required]],
      defaultLanguage: ['en', [Validators.required]],
      active: [true],
    });
  }

  compareGroup(a: Group, b: Group) {
    return a.id === b.id;
  }

  update(id: number) {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(UserActions.updateUser({ data: this.form.value, id }));
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
        type: 'warning',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if (result) {
          this.store.dispatch(UserActions.deleteUser({ id }));
        }
      });
  }
}
