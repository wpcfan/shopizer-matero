import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductAttributeListComponent } from './list.component';

describe('ProductOptionsAttributesListComponent', () => {
  let component: ProductAttributeListComponent;
  let fixture: ComponentFixture<ProductAttributeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAttributeListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
