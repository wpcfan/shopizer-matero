import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListComponent } from './list.component';

describe('OrdersListComponent', () => {
  let component: OrdersListComponent;
  let fixture: ComponentFixture<OrdersListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
