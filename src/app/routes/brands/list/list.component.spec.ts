import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsListComponent } from './list.component';

describe('BrandsListComponent', () => {
  let component: BrandsListComponent;
  let fixture: ComponentFixture<BrandsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
