import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUpdateComponent } from './update.component';

describe('CategoriesUpdateComponent', () => {
  let component: CategoriesUpdateComponent;
  let fixture: ComponentFixture<CategoriesUpdateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
