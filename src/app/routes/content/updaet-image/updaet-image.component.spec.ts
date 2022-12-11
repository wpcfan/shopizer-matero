import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentUpdaetImageComponent } from './updaet-image.component';

describe('ContentUpdaetImageComponent', () => {
  let component: ContentUpdaetImageComponent;
  let fixture: ComponentFixture<ContentUpdaetImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentUpdaetImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentUpdaetImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
