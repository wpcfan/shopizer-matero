import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxClassListComponent } from './class-list.component';

describe('TaxClassListComponent', () => {
  let component: TaxClassListComponent;
  let fixture: ComponentFixture<TaxClassListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxClassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
