import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPackagingComponent } from './packaging.component';

describe('ShippingPackagingComponent', () => {
  let component: ShippingPackagingComponent;
  let fixture: ComponentFixture<ShippingPackagingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingPackagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
