import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MerchantsUpdateComponent } from './update.component';

describe('MerchantsUpdateComponent', () => {
  let component: MerchantsUpdateComponent;
  let fixture: ComponentFixture<MerchantsUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantsUpdateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
