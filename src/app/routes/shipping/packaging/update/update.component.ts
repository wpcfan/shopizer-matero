import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '@shared';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { ShippingService } from '../../+state/services/shipping.service';

@Component({
  selector: 'app-shipping-packaging-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingPackagingUpdateComponent implements OnInit {
  form!: FormGroup;
  packageTypes = [
    {
      label: 'Item Packaging',
      value: 'ITEM',
    },
    {
      label: 'Box Packaging',
      value: 'BOX',
    },
  ];
  selected$ = this.route.paramMap.pipe(
    filter(params => params.has('code')),
    map(params => params.get('code') as string),
    switchMap(code => this.service.getPackageByCode(code)),
    tap(selected => {
      if (selected) {
        this.form.patchValue(selected);
      }
    })
  );
  constructor(
    private fb: FormBuilder,
    private service: ShippingService,
    private router: Router,
    private route: ActivatedRoute,
    private local: LocalStorageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: [{ value: '', disabled: true }, [Validators.required]],
      type: ['', [Validators.required]],
      shippingHeight: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
      shippingWidth: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
      shippingLength: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
      shippingWeight: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
    });
  }

  update(code: string) {
    if (this.form.invalid) {
      return;
    }
    this.service
      .updatePackage(code, this.form.value)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/shipping', 'packaging', 'list'], {
          relativeTo: this.route,
          queryParams: { lang: this.local.get('settings').language },
          queryParamsHandling: 'merge',
        });
      });
  }
}
