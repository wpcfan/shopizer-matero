import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypesListComponent } from './list.component';

describe('ProductTypesListComponent', () => {
  let component: ProductTypesListComponent;
  let fixture: ComponentFixture<ProductTypesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
