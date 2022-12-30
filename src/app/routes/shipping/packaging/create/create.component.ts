import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '@shared';
import { Subscription, take } from 'rxjs';
import { ShippingService } from '../../+state/services/shipping.service';

@Component({
  selector: 'app-shipping-packaging-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingPackagingCreateComponent implements OnInit, OnDestroy {
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
  form!: FormGroup;
  sub = new Subscription();
  constructor(
    private fb: FormBuilder,
    private service: ShippingService,
    private router: Router,
    private route: ActivatedRoute,
    private local: LocalStorageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      type: ['', [Validators.required]],
      shippingHeight: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
      shippingWidth: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
      shippingLength: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
      shippingWeight: [0, [Validators.required, Validators.min(0), Validators.max(10000)]],
    });
    this.sub.add(
      this.form.get('type')?.valueChanges.subscribe(type => {
        if (type === 'ITEM') {
          this.form.get('shippingHeight')?.disable();
          this.form.get('shippingWidth')?.disable();
          this.form.get('shippingLength')?.disable();
          this.form.get('shippingWeight')?.disable();
        } else {
          this.form.get('shippingHeight')?.enable();
          this.form.get('shippingWidth')?.enable();
          this.form.get('shippingLength')?.enable();
          this.form.get('shippingWeight')?.enable();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.service
      .createPackage(this.form.value)
      .pipe(take(1))
      .subscribe(_ => {
        this.router.navigate(['../', 'update', this.form.value.code], {
          relativeTo: this.route,
          queryParams: { lang: this.local.get('settings').language },
          queryParamsHandling: 'merge',
        });
      });
  }
}
