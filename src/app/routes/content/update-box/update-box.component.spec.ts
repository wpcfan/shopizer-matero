import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentUpdateBoxComponent } from './update-box.component';

describe('ContentUpdateBoxComponent', () => {
  let component: ContentUpdateBoxComponent;
  let fixture: ComponentFixture<ContentUpdateBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentUpdateBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentUpdateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
