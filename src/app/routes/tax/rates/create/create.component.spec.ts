import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRatesCreateComponent } from './create.component';

describe('TaxRatesCreateComponent', () => {
  let component: TaxRatesCreateComponent;
  let fixture: ComponentFixture<TaxRatesCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxRatesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRatesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
