import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingExpeditionComponent } from './expedition.component';

describe('ShippingExpeditionComponent', () => {
  let component: ShippingExpeditionComponent;
  let fixture: ComponentFixture<ShippingExpeditionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingExpeditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
