import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptionsValuesCreateComponent } from './create.component';

describe('ProductOptionsValuesCreateComponent', () => {
  let component: ProductOptionsValuesCreateComponent;
  let fixture: ComponentFixture<ProductOptionsValuesCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionsValuesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsValuesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
