import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptionsValuesUpdateComponent } from './update.component';

describe('ProductOptionsValuesUpdateComponent', () => {
  let component: ProductOptionsValuesUpdateComponent;
  let fixture: ComponentFixture<ProductOptionsValuesUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionsValuesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsValuesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
