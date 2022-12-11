import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupUpdateComponent } from './update.component';

describe('ProductGroupUpdateComponent', () => {
  let component: ProductGroupUpdateComponent;
  let fixture: ComponentFixture<ProductGroupUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
