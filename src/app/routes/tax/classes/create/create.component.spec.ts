import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxClassesCreateComponent } from './create.component';

describe('TaxClassesCreateComponent', () => {
  let component: TaxClassesCreateComponent;
  let fixture: ComponentFixture<TaxClassesCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxClassesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxClassesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
