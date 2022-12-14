import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MerchantsCreateComponent } from './create.component';

describe('MerchantsCreateComponent', () => {
  let component: MerchantsCreateComponent;
  let fixture: ComponentFixture<MerchantsCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantsCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
