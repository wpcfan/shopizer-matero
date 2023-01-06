import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContentUpdateImageComponent } from './update-image.component';

describe('ContentUpdaetImageComponent', () => {
  let component: ContentUpdateImageComponent;
  let fixture: ComponentFixture<ContentUpdateImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContentUpdateImageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentUpdateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
