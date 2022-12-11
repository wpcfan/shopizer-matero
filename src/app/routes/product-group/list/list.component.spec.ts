import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupListComponent } from './list.component';

describe('ProductGroupListComponent', () => {
  let component: ProductGroupListComponent;
  let fixture: ComponentFixture<ProductGroupListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
