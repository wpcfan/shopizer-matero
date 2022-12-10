import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import { Store } from '@ngrx/store';
import { buildRoute as route } from '@shared/utils/menu';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidemenuComponent {
  // Note: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menu$ = this.store.select(fromMenu.selectMenus);

  buildRoute = route;

  constructor(private store: Store) {}
}
