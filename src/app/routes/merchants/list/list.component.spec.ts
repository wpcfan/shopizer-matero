import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MerchantsListComponent } from './list.component';

describe('MerchantsListComponent', () => {
  let component: MerchantsListComponent;
  let fixture: ComponentFixture<MerchantsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
