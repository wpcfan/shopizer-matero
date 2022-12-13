import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import { Menu } from '@models';
import { Store } from '@ngrx/store';
import { getMenuLevel } from '@shared';
import { tap } from 'rxjs';
@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  @HostBinding('class') class = 'matero-page-header';

  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: string[] = [];
  @Input()
  get hideBreadcrumb() {
    return this._hideBreadCrumb;
  }
  set hideBreadcrumb(value: boolean) {
    this._hideBreadCrumb = coerceBooleanProperty(value);
  }
  private _hideBreadCrumb = false;
  menus$ = this.store.select(fromMenu.selectMenus).pipe(
    tap(menus => {
      this.nav = Array.isArray(this.nav) ? this.nav : [];
      if (this.nav.length === 0) {
        this.genBreadcrumb(menus);
      }
      this.title = this.title || this.nav[this.nav.length - 1];
    })
  );

  constructor(private router: Router, private store: Store) {}

  genBreadcrumb(menus: Menu[]) {
    const routes = this.router.url.slice(1).split('/');
    this.nav = getMenuLevel(routes, menus);
    this.nav.unshift('home');
  }

  static ngAcceptInputType_hideBreadcrumb: BooleanInput;
}
