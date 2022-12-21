import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductOptionsListComponent } from './list.component';

describe('ProductOptionsOptionsListComponent', () => {
  let component: ProductOptionsListComponent;
  let fixture: ComponentFixture<ProductOptionsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductOptionsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
