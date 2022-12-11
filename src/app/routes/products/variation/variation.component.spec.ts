import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsVariationComponent } from './variation.component';

describe('ProductsVariationComponent', () => {
  let component: ProductsVariationComponent;
  let fixture: ComponentFixture<ProductsVariationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
