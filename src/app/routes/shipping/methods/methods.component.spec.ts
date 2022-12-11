import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodsComponent } from './methods.component';

describe('ShippingMethodsComponent', () => {
  let component: ShippingMethodsComponent;
  let fixture: ComponentFixture<ShippingMethodsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
