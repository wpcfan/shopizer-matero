import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import * as MerchantActions from '../../merchants/+state/actions';
import * as fromMerchants from '../../merchants/+state/selectors/merchant.selectors';
@Component({
  selector: 'app-merchants-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantsLogoComponent {
  code$ = this.route.paramMap
    .pipe(
      filter(params => params.has('code')),
      map(params => params.get('code'))
    )
    .pipe(
      tap(code => {
        if (code) {
          this.store.dispatch(MerchantActions.getByCode({ code }));
        }
      })
    );
  logo$ = this.store.select(fromMerchants.selectMerchantLogo);
  constructor(private route: ActivatedRoute, private store: Store) {}

  onFileSelected(files: File[], code: string) {
    if (files.length > 0) {
      this.store.dispatch(MerchantActions.uploadLogo({ file: files[0], code }));
    }
  }

  onFileRemoved(code: string) {
    this.store.dispatch(MerchantActions.removeLogo({ code }));
  }
}
