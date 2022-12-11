import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingOriginComponent } from './origin.component';

describe('ShippingOriginComponent', () => {
  let component: ShippingOriginComponent;
  let fixture: ComponentFixture<ShippingOriginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingOriginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
