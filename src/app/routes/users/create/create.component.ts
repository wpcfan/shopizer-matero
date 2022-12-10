import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import { Menu } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCreateComponent implements OnInit {
  menus$: Observable<Menu[]>;
  constructor(private store: Store) {
    this.menus$ = this.store.select(fromMenu.selectMenus);
  }

  ngOnInit() {}
}
