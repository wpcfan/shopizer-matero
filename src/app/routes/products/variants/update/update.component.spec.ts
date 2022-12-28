import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsVariantsUpdateComponent } from './update.component';

describe('ProductsVariantsUpdateComponent', () => {
  let component: ProductsVariantsUpdateComponent;
  let fixture: ComponentFixture<ProductsVariantsUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsVariantsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsVariantsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
