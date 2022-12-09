import { Component, OnInit } from '@angular/core';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import { Menu } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class ProfileSettingComponent implements OnInit {
  menus$: Observable<Menu[]>;
  constructor(private store: Store) {
    this.menus$ = this.store.select(fromMenu.selectMenus);
  }

  ngOnInit() {}
}
