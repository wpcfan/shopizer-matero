import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsVariantsCreateComponent } from './create.component';

describe('ProductsVariantsCreateComponent', () => {
  let component: ProductsVariantsCreateComponent;
  let fixture: ComponentFixture<ProductsVariantsCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsVariantsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsVariantsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
