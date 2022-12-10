import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '@models';
import { getMenuLevel } from '@shared';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent implements OnInit {
  @HostBinding('class') class = 'matero-page-header';

  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: string[] = [];
  @Input() menus: Menu[] = [];
  @Input()
  get hideBreadcrumb() {
    return this._hideBreadCrumb;
  }
  set hideBreadcrumb(value: boolean) {
    this._hideBreadCrumb = coerceBooleanProperty(value);
  }
  private _hideBreadCrumb = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }

    this.title = this.title || this.nav[this.nav.length - 1];
  }

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    this.nav = getMenuLevel(routes, this.menus);
    this.nav.unshift('home');
  }

  static ngAcceptInputType_hideBreadcrumb: BooleanInput;
}
