import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreateBoxComponent } from './create-box.component';

describe('ContentCreateBoxComponent', () => {
  let component: ContentCreateBoxComponent;
  let fixture: ComponentFixture<ContentCreateBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCreateBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
