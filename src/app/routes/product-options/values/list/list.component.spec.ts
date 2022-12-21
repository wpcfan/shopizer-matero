import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptionsValuesListComponent } from './list.component';

describe('ProductOptionsValuesListComponent', () => {
  let component: ProductOptionsValuesListComponent;
  let fixture: ComponentFixture<ProductOptionsValuesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionsValuesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
