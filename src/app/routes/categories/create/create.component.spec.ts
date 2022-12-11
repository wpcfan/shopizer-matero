import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCreateComponent } from './create.component';

describe('CategoriesCreateComponent', () => {
  let component: CategoriesCreateComponent;
  let fixture: ComponentFixture<CategoriesCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
