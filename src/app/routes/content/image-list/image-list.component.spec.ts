import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentImageListComponent } from './image-list.component';

describe('ContentImageListComponent', () => {
  let component: ContentImageListComponent;
  let fixture: ComponentFixture<ContentImageListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
