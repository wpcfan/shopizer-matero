import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRatesListComponent } from './list.component';

describe('TaxRatesListComponent', () => {
  let component: TaxRatesListComponent;
  let fixture: ComponentFixture<TaxRatesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxRatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
