import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSetsComponent } from './sets.component';

describe('ProductsSetsComponent', () => {
  let component: ProductsSetsComponent;
  let fixture: ComponentFixture<ProductsSetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
