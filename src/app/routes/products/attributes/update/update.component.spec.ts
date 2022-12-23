import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductAttributeUpdateComponent } from './update.component';

describe('ProductOptionsAttributesUpdateComponent', () => {
  let component: ProductAttributeUpdateComponent;
  let fixture: ComponentFixture<ProductAttributeUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAttributeUpdateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
