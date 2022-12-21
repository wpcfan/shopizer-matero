import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionsCreateComponent } from './create.component';

describe('ProductOptionsOptionsCreateComponent', () => {
  let component: ProductOptionsCreateComponent;
  let fixture: ComponentFixture<ProductOptionsCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOptionsCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
