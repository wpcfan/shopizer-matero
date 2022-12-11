import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRateListComponent } from './rate-list.component';

describe('TaxRateListComponent', () => {
  let component: TaxRateListComponent;
  let fixture: ComponentFixture<TaxRateListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxRateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxRateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
