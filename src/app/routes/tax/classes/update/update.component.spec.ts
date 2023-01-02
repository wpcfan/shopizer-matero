import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxClassesUpdateComponent } from './update.component';

describe('TaxClassesUpdateComponent', () => {
  let component: TaxClassesUpdateComponent;
  let fixture: ComponentFixture<TaxClassesUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxClassesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxClassesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
