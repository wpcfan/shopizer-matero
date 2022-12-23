import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductAttributeCreateComponent } from './create.component';

describe('ProductOptionsAttributesCreateComponent', () => {
  let component: ProductAttributeCreateComponent;
  let fixture: ComponentFixture<ProductAttributeCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAttributeCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
