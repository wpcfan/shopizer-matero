import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionValueListComponent } from './list.component';

describe('ProductOptionsValuesListComponent', () => {
  let component: ProductOptionValueListComponent;
  let fixture: ComponentFixture<ProductOptionValueListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOptionValueListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
