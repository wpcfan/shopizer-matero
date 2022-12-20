import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypesUpdateComponent } from './update.component';

describe('ProductTypesUpdateComponent', () => {
  let component: ProductTypesUpdateComponent;
  let fixture: ComponentFixture<ProductTypesUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
