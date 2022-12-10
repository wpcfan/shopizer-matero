import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PreloaderService } from '@core';
import * as fromRoot from '@core/+state/selectors/setting.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="theme$ | async as theme">
      <div [class]="theme" style="height: 100%;">
        <router-outlet></router-outlet>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  theme$?: Observable<string>;
  constructor(private preloader: PreloaderService, private store: Store) {}

  ngOnInit() {
    this.theme$ = this.store.select(fromRoot.selectThemeClass);
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
