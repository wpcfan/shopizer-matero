import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ShippingService } from '../+state/services/shipping.service';

@Component({
  selector: 'app-shipping-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingMethodsComponent implements OnInit {
  methods$ = this.service.getMethods();
  constructor(private service: ShippingService) {}

  ngOnInit() {}
}
