import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentUpdaetPageComponent } from './updaet-page.component';

describe('ContentUpdaetPageComponent', () => {
  let component: ContentUpdaetPageComponent;
  let fixture: ComponentFixture<ContentUpdaetPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentUpdaetPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentUpdaetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
