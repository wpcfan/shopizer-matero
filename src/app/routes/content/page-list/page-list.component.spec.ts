import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPageListComponent } from './page-list.component';

describe('ContentPageListComponent', () => {
  let component: ContentPageListComponent;
  let fixture: ComponentFixture<ContentPageListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
