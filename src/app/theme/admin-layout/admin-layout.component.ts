import { Directionality } from '@angular/cdk/bidi';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnDestroy,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { AppSettings, SettingsService } from '@core';
import { Store } from '@ngrx/store';
import { AppDirectionality } from '@shared';

import * as SettingActions from '@core/+state/actions/setting.actions';
import { State } from '@core/+state/reducers/setting.reducer';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;

  options?: State;

  private layoutChangesSubscription = Subscription.EMPTY;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  private isMobileScreen = false;

  @HostBinding('class.matero-content-width-fix') get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options?.navPos === 'side' &&
      this.options?.sidenavOpened &&
      !this.isOver
    );
  }

  private isContentWidthFixed = true;

  @HostBinding('class.matero-sidenav-collapsed-fix') get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options?.navPos === 'top' || (this.options?.sidenavOpened && this.isOver))
    );
  }

  private isCollapsedWidthFixed = false;

  constructor(
    private router: Router,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
    private overlay: OverlayContainer,
    private element: ElementRef,
    private store: Store,
    private settings: SettingsService,
    @Optional() @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality
  ) {
    this.settings.getOptions().subscribe(options => {
      this.options = options;
      this.dir.value = this.options.dir;
      this.document.body.dir = this.dir.value;
      if (this.options.theme === 'auto') {
        this.setAutoTheme();
      }

      // Initialize project theme with options
      this.receiveOptions(this.options);
    });

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe(state => {
        // SidenavOpened must be reset true when layout changes

        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.store.dispatch(
          SettingActions.setSidenavWhenLayoutChanges({
            sidenavOpened: true,
            sidenavCollapsed: state.breakpoints[TABLET_MEDIAQUERY],
          })
        );

        this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      if (this.isOver) {
        this.sidenav.close();
      }
      this.content.scrollTo({ top: 0 });
    });
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.store.dispatch(
      SettingActions.setSidenavCollapsed({ sidenavCollapsed: !this.options?.sidenavCollapsed })
    );
    // this.resetCollapsedState();
  }

  // TODO: Trigger when transition end
  // resetCollapsedState(timer = 400) {
  //   setTimeout(() => this.settings.setOptions(this.options), timer);
  // }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.store.dispatch(SettingActions.setSidenavOpened({ sidenavOpened: isOpened }));
  }

  setAutoTheme() {
    // Check whether the browser support `prefers-color-scheme`
    if (this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set theme to dark if `prefers-color-scheme` is dark. Otherwise, set it to light.
      this.store.dispatch(SettingActions.setTheme({ theme: isSystemDark ? 'dark' : 'light' }));
    }
  }

  // Demo purposes only

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
    this.toggleDirection(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.element.nativeElement.classList.add('theme-dark');
      this.overlay.getContainerElement().classList.add('theme-dark');
    } else {
      this.element.nativeElement.classList.remove('theme-dark');
      this.overlay.getContainerElement().classList.remove('theme-dark');
    }
  }

  toggleDirection(options: AppSettings) {
    this.dir.value = options.dir;
    this.document.body.dir = this.dir.value;
  }
}
