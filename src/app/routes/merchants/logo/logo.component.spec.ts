import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsLogoComponent } from './logo.component';

describe('MerchantsLogoComponent', () => {
  let component: MerchantsLogoComponent;
  let fixture: ComponentFixture<MerchantsLogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantsLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
