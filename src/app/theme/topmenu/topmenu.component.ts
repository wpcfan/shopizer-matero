import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import { Menu, TopmenuState } from '@models';
import { Store } from '@ngrx/store';
import { buildRoute as route } from '@shared/utils/menu';
import { filter, Subscription } from 'rxjs';
@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopmenuComponent implements OnDestroy {
  @HostBinding('class') class = 'matero-topmenu';

  menu$ = this.store.select(fromMenu.selectMenus);

  /** Delete empty values and rebuild route. */
  buildRoute = route;

  menuList: Menu[] = [];
  menuStates: TopmenuState[] = [];

  private menuSubscription = Subscription.EMPTY;
  private routerSubscription = Subscription.EMPTY;

  constructor(private store: Store, private router: Router) {
    this.menuSubscription = this.menu$.subscribe(res => {
      this.menuList = res;
      this.menuList.forEach(item => {
        this.menuStates.push({
          active: this.router.url.split('/').includes(item.route),
          route: item.route,
        });
      });
    });
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
    this.routerSubscription.unsubscribe();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => {
        this.menuStates.forEach(item => (item.active = false));
        setTimeout(() => (this.menuStates[index].active = rla.isActive));
      });
  }
}
