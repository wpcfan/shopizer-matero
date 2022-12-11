import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreatePageComponent } from './create-page.component';

describe('ContentCreatePageComponent', () => {
  let component: ContentCreatePageComponent;
  let fixture: ComponentFixture<ContentCreatePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
