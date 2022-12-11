import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsValuesComponent } from './values.component';

describe('ProductsValuesComponent', () => {
  let component: ProductsValuesComponent;
  let fixture: ComponentFixture<ProductsValuesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
