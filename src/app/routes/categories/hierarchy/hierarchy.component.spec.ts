import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesHierarchyComponent } from './hierarchy.component';

describe('CategoriesHierarchyComponent', () => {
  let component: CategoriesHierarchyComponent;
  let fixture: ComponentFixture<CategoriesHierarchyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
