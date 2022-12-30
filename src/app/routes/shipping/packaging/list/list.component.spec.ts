import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPackagingListComponent } from './list.component';

describe('ShippingPackagingListComponent', () => {
  let component: ShippingPackagingListComponent;
  let fixture: ComponentFixture<ShippingPackagingListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingPackagingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPackagingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
