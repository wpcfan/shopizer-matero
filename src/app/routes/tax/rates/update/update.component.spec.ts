import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRatesUpdateComponent } from './update.component';

describe('TaxRatesUpdateComponent', () => {
  let component: TaxRatesUpdateComponent;
  let fixture: ComponentFixture<TaxRatesUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxRatesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRatesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
