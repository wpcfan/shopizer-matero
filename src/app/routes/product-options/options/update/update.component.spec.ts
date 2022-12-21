import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionsUpdateComponent } from './update.component';

describe('ProductOptionsOptionsUpdateComponent', () => {
  let component: ProductOptionsUpdateComponent;
  let fixture: ComponentFixture<ProductOptionsUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOptionsUpdateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
