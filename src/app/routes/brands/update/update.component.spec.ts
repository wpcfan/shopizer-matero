import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsUpdateComponent } from './update.component';

describe('BrandsUpdateComponent', () => {
  let component: BrandsUpdateComponent;
  let fixture: ComponentFixture<BrandsUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
