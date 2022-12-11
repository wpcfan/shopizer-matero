import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOptionsComponent } from './options.component';

describe('ProductsOptionsComponent', () => {
  let component: ProductsOptionsComponent;
  let fixture: ComponentFixture<ProductsOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
