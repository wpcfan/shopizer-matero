import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBoxListComponent } from './box-list.component';

describe('ContentBoxListComponent', () => {
  let component: ContentBoxListComponent;
  let fixture: ComponentFixture<ContentBoxListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBoxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
