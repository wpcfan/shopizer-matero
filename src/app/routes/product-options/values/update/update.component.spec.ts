import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionValueUpdateComponent } from './update.component';

describe('ProductOptionsValuesUpdateComponent', () => {
  let component: ProductOptionValueUpdateComponent;
  let fixture: ComponentFixture<ProductOptionValueUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOptionValueUpdateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionValueUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
