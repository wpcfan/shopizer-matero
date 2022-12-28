import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsVariantsListComponent } from './list.component';

describe('ProductsVariantsListComponent', () => {
  let component: ProductsVariantsListComponent;
  let fixture: ComponentFixture<ProductsVariantsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsVariantsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsVariantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
