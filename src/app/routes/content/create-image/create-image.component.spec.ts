import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreateImageComponent } from './create-image.component';

describe('ContentCreateImageComponent', () => {
  let component: ContentCreateImageComponent;
  let fixture: ComponentFixture<ContentCreateImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCreateImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
