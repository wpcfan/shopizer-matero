import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPackagingUpdateComponent } from './update.component';

describe('ShippingPackagingUpdateComponent', () => {
  let component: ShippingPackagingUpdateComponent;
  let fixture: ComponentFixture<ShippingPackagingUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingPackagingUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPackagingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
