import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypesCreateComponent } from './create.component';

describe('ProductTypesCreateComponent', () => {
  let component: ProductTypesCreateComponent;
  let fixture: ComponentFixture<ProductTypesCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
