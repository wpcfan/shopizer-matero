import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupCreateComponent } from './create.component';

describe('ProductGroupCreateComponent', () => {
  let component: ProductGroupCreateComponent;
  let fixture: ComponentFixture<ProductGroupCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
