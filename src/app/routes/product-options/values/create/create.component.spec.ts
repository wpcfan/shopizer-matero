import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionValueCreateComponent } from './create.component';

describe('ProductOptionsValuesCreateComponent', () => {
  let component: ProductOptionValueCreateComponent;
  let fixture: ComponentFixture<ProductOptionValueCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOptionValueCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionValueCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
