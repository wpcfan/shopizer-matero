import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPackagingCreateComponent } from './create.component';

describe('ShippingPackagingCreateComponent', () => {
  let component: ShippingPackagingCreateComponent;
  let fixture: ComponentFixture<ShippingPackagingCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingPackagingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPackagingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
