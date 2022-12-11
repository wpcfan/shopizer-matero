import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentUpdaetBoxComponent } from './updaet-box.component';

describe('ContentUpdaetBoxComponent', () => {
  let component: ContentUpdaetBoxComponent;
  let fixture: ComponentFixture<ContentUpdaetBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentUpdaetBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentUpdaetBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
