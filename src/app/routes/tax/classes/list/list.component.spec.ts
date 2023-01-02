import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxClassesListComponent } from './list.component';

describe('TaxClassesListComponent', () => {
  let component: TaxClassesListComponent;
  let fixture: ComponentFixture<TaxClassesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxClassesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxClassesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
